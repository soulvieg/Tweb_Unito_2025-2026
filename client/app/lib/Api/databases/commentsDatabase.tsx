import type { CommentType, CreateCommentType } from "../../types";
import { ax } from "../api";
import { queriesKeys } from "../queriesKeys";


const db = {
	getAll: async (postId: number) =>
		await ax
			.get<CommentType[]>(`/posts/${postId}/comments`)
			.then((res) => res.data)
			.catch((e) => {
				console.error("Error fetching item:", e);
				throw e;
			}),
	create: async (data: CreateCommentType) =>
		await ax
			.post<CommentType>(`${"comments"}`, data)
			.then((res) => res.data)
			.catch((e) => {
				console.error("Error fetching item:", e);
				throw e;
			}),
	delete: async (id: number) =>
		await ax
			.delete(`${"comments"}/${id}`)
			.then((res) => res.data)
			.catch((e) => {
				console.error("Error fetching item:", e);
				throw e;
			}),
	mute: async (id: number, muted: boolean) =>
		await ax
			.patch(`/comments/${id}/mute`, { muted: muted })
			.then((res) => res.data)
			.catch((e) => {
				console.error("Error fetching item:", e);
				throw e;
			}),
};

export function commentsQueries() {
	return {
		getAll: (postId: number) => ({
			queryKey: queriesKeys.comments.all,
			queryFn: async () => db.getAll(postId),
		}),
		create: (data: CreateCommentType) => ({
			mutationKey: queriesKeys.comments.all,
			mutationFn: async () => db.create(data),
		}),
		delete: (id: number) => ({
			mutationKey: queriesKeys.comments.single(id),
			mutationFn: async () => db.delete(id),
		}),
		mute: (id: number, muted: boolean) => ({
			mutationKey: queriesKeys.comments.all,
			mutationFn: async () => db.mute(id, muted),
		}),
	};
}
