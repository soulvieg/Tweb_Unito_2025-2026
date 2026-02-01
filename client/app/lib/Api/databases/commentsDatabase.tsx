import type { CommentType, CreateCommentType } from "../../types";
import { ax } from "../api";
import { queriesKeys } from "../queriesKeys";

const path = "/community/posts";

const db = {
	getAll: async (postId: number) =>
		await ax
			.get<CommentType[]>(`${path}/${postId}/comments`)
			.then((res) =>
				res.data?.sort(
					(a, b) =>
						new Date(b.timestamp).getTime() -
						new Date(a.timestamp).getTime(),
				),
			)
			.catch((e) => {
				console.error("Error fetching item:", e);
				throw e;
			}),
	create: async (data: CreateCommentType) =>
		await ax
			.post<CommentType>(`${"/community/comments"}`, data)
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
	mute: async (id: number) =>
		await ax
			.put(`/community/comments/${id}/mute`)
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
		mute: (id: number) => ({
			mutationKey: queriesKeys.comments.all,
			mutationFn: async () => db.mute(id),
		}),
	};
}
