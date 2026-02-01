import type {
	CommentType,
	CreateCommentType,
	CreatePostType,
	DatabaseType,
	PostType,
} from "../../types";
import { ax, database } from "../api";
import { queriesKeys } from "../queriesKeys";

const path = "community/posts";

const db: DatabaseType<PostType, CreatePostType> = database({
	path: path,
});

export function postsQueries() {
	return {
		getAll: () => ({
			queryKey: queriesKeys.posts.all,
			queryFn: async () =>
				await ax
					.get<PostType[]>(`${path}`)
					.then((res) =>
						res.data?.sort(
							(a, b) =>
								new Date(b.creationDate).getTime() -
								new Date(a.creationDate).getTime(),
						),
					)
					.catch((e) => {
						console.error("Error fetching item:", e);
						throw e;
					}),
		}),
		getOne: (id: number) => ({
			queryKey: queriesKeys.posts.single(id),
			queryFn: async () => db.getOne(id),
		}),
		create: (data: CreatePostType) => ({
			mutationKey: queriesKeys.posts.all,
			mutationFn: async () => db.create(data),
		}),
		update: (id: number, data: Partial<CreatePostType>) => ({
			mutationKey: queriesKeys.posts.single(id),
			mutationFn: async () => db.update(id, data),
		}),
		delete: (id: number) => ({
			mutationKey: queriesKeys.posts.single(id),
			mutationFn: async () => db.delete(id),
		}),
	};
}
