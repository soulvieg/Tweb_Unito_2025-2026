import type { LoginType, UserType } from "../../types";
import { ax } from "../api";
import { queriesKeys } from "../queriesKeys";

const path = "/session";

const db = {
	login: async (login: LoginType) =>
		await ax
			.post<UserType>(`${path}/login`, login)
			.then((res) => res.data)
			.catch((e) => {
				console.error("Error fetching item:", e);
				throw e;
			}),
	singup: async (singup: LoginType) =>
		await ax
			.post<UserType>(`${path}/signup`, singup)
			.then((res) => res.data)
			.catch((e) => {
				console.error("Error fetching item:", e);
				throw e;
			}),
};

export function authQueries() {
	return {
		login: {
			mutationKey: queriesKeys.login,
			mutationFn: db.login,
		},
		signup: {
			mutationKey: queriesKeys.singup,
			mutationFn: db.singup,
		},
	};
}
