import type {
	CommentType,
	CreateCommentType,
	CreateNewsType,
	NewsType,
	UserType,
} from "../../types";
import { ax, database } from "../api";
import { queriesKeys } from "../queriesKeys";

const db = {
	getAll: async () =>
		await ax
			.get<UserType[]>(`/users`)
			.then((res) => res.data)
			.catch((e) => {
				console.error("Error fetching item:", e);
				throw e;
			}),
	getOne: async (id: number) =>
		await ax
			.get<UserType>(`/users/${id}`)
			.then((res) => res.data)
			.catch((e) => {
				console.error("Error fetching item:", e);
				throw e;
			}),
};

export function usersQueries() {
	return {
		getAll: () => ({
			queryKey: queriesKeys.users.all,
			queryFn: async () => db.getAll(),
		}),
		getOne: (id: number) => ({
			queryKey: queriesKeys.users.all,
			queryFn: async () => db.getOne(id),
		}),
	};
}
