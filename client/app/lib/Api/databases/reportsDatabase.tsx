import type {
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

const db = {
	create: async (data: CreateReportType) =>
		await ax
			.post<ReportType>(`${"/community/reports"}`, data)
			.then((res) => res.data)
			.catch((e) => {
				console.error("Error fetching item:", e);
				throw e;
			}),
};

export function reportsQueries() {
	return {
		create: (data: CreateReportType) => ({
			mutationKey: queriesKeys.reports.all,
			mutationFn: async () => db.create(data),
		}),
	};
}
