import type {
	CategoryType,
	CommentType,
	CreateCommentType,
	CreateNewsType,
	CreateReportType,
	DatabaseType,
	NewsType,
	ReportType,
	UserType,
} from "../../types";
import { ax, database } from "../api";
import { queriesKeys } from "../queriesKeys";

const path = "/categories";

const db = {
	getAll: async () =>
		await ax
			.get<CategoryType[]>(path)
			.then((res) => res.data)
			.catch((e) => {
				console.error("Error fetching item:", e);
				throw e;
			}),
	getOne: async (categoryId: number) =>
		await ax
			.get<CategoryType>(`${path}/${categoryId}`)
			.then((res) => res.data)
			.catch((e) => {
				console.error("Error fetching item:", e);
				throw e;
			}),
};

export function reportsQueries() {
	return {
		getAll: () => ({
			queryKey: queriesKeys.categories.all,
			queryFn: async () => db.getAll(),
		}),
		getOne: (categoryId: number) => ({
			queryKey: queriesKeys.categories.all,
			queryFn: async () => db.getOne(categoryId),
		}),
	};
}
