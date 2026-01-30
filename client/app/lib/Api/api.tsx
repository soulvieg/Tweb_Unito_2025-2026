import axios from "axios";
import type {
	CommentType,
	CreateCommentType,
	CreateNewsType,
	CreatePostType,
	DatabaseType,
	NewsType,
	PostType,
	LoginType,
	UserType,
} from "../types";
import { newsQueries } from "./databases/newsDatabase";
import { usersQueries } from "./databases/usersDatabase";
import { reportsQueries } from "./databases/reportsDatabase";
import { postsQueries } from "./databases/postsQueries";
import { commentsQueries } from "./databases/commentsDatabase";
import { authQueries } from "./databases/authDatabase";

export const ax = axios.create({
	baseURL: "http://localhost:8080",
	withCredentials: true, // Required if you are using Sessions or Cookies
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

export function database<T, CreateT>({ path }: { path: string }) {
	return {
		getAll: async () =>
			await ax
				.get<T[]>(path)
				.then((res) => res.data)
				.catch((e) => {
					console.error("Error fetching item:", e);
					throw e;
				}),
		getOne: async (id: number) =>
			await ax
				.get<T>(`${path}/${id}`)
				.then((res) => res.data)
				.catch((e) => {
					console.error("Error fetching item:", e);
					throw e;
				}),
		create: async (data: CreateT) =>
			await ax
				.post<T>(`${path}`, data)
				.then((res) => res.data)
				.catch((e) => {
					console.error("Error fetching item:", e);
					throw e;
				}),
		update: async (id: number, data: Partial<CreateT>) =>
			await ax
				.put<T>(`${path}/${id}`, data)
				.then((res) => res.data)
				.catch((e) => {
					console.error("Error fetching item:", e);
					throw e;
				}),
		delete: async (id: number) =>
			await ax
				.delete(`${path}/${id}`)
				.then((res) => res.data)
				.catch((e) => {
					console.error("Error fetching item:", e);
					throw e;
				}),
	};
}

export const queries = {
	news: newsQueries(),
	posts: postsQueries(),
	comments: commentsQueries(),
	users: usersQueries(),
	auth: authQueries(),
	reports: reportsQueries(),
};
