import type {
	CommentType,
	CreateCommentType,
	CreatePostType,
	DatabaseType,
	PostType,
} from "../../types";
import { database } from "../api";
import { queriesKeys } from "../queriesKeys";

const path = "posts";

const db: DatabaseType<PostType, CreatePostType> = database({
	path: path,
});

export function postsQueries() {
	return {
		getAll: () => ({
			queryKey: queriesKeys.posts.all,
			queryFn: async () => db.getAll(),
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
