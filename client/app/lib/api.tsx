import type {
	CommentType,
	CreateCommentType,
	CreateNewsType,
	CreatePostType,
	NewsType,
	PostType,
} from "./types";
import { ax } from "./Api/api";

export const queriesKeys = {
	news: {
		all: ["news"] as const,
		single: (id: string) => [queriesKeys.news.all, id] as const,
	} as const,
	posts: {
		all: ["posts"] as const,
		single: (id: string) => [queriesKeys.posts.all, id] as const,
	} as const,
	comments: {
		all: ["comments"] as const,
		single: (id: string) => [queriesKeys.comments.all, id] as const,
	} as const,
};

type DatabaseType<T, CreateT> = {
	getAll: () => Promise<T[]>;
	getOne: (id: string) => Promise<T[]>;
	create: (data: CreateT) => Promise<T>;
	update: (id: string, data: Partial<CreateT>) => Promise<T>;
};

export function database<T, CreateT>({ path }: { path: string }) {
	const base = `${path}`;
	return {
		getAll: async () =>
			await ax
				.get<T[]>(base)
				.then((res) => res.data)
				.catch((e) => {
					console.error("Error fetching item:", e);
					throw e;
				}),
		getOne: async (id: string) =>
			await ax
				.get<T[]>(`${base}/${id}`)
				.then((res) => res.data)
				.catch((e) => {
					console.error("Error fetching item:", e);
					throw e;
				}),
		create: async (data: CreateT) =>
			await ax
				.post<T>(`${base}`, data)
				.then((res) => res.data)
				.catch((e) => {
					console.error("Error fetching item:", e);
					throw e;
				}),
		update: async (id: string, data: Partial<CreateT>) =>
			await ax
				.put<T>(`${base}/${id}`, data)
				.then((res) => res.data)
				.catch((e) => {
					console.error("Error fetching item:", e);
					throw e;
				}),
	};
}

function getQueries<T, CreateT>(
	key: keyof typeof queriesKeys,
	db: DatabaseType<T, CreateT>,
) {
	return {
		getAll: {
			queryKey: queriesKeys[key].all,
			queryFn: db.getAll,
		},
		getOne: (id: string) => ({
			queryKey: queriesKeys[key].single(id),
			queryFn: () => db.getOne(id),
		}),
		create: (data: CreateT) => ({
			queryKey: queriesKeys[key].all,
			queryFn: () => db.create(data),
		}),
		update: (id: string, data: Partial<CreateT>) => ({
			queryKey: queriesKeys[key].single(id),
			queryFn: () => db.update(id, data),
		}),
	};
}

const newsDatabase: DatabaseType<NewsType, CreateNewsType> = database({
	path: "news",
});
const postsDatabase: DatabaseType<PostType, CreatePostType> = database({
	path: "posts",
});
const commentsDatabase: DatabaseType<CommentType, CreateCommentType> = database(
	{
		path: "comments",
	},
);

export const queries = {
	news: getQueries<NewsType, CreateNewsType>("news", newsDatabase),
	posts: getQueries<PostType, CreatePostType>("posts", postsDatabase),
	comments: getQueries<CommentType, CreateCommentType>(
		"comments",
		commentsDatabase,
	),
};
