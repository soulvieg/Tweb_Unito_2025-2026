import type { CreateNewsType, DatabaseType, NewsType } from "../../types";
import { database } from "../api";
import { queriesKeys } from "../queriesKeys";

const path = "news";

const db: DatabaseType<NewsType, CreateNewsType> = database({
	path: path,
});

export function newsQueries() {
	return {
		getAll: () => ({
			queryKey: queriesKeys.news.all,
			queryFn: async () => db.getAll(),
		}),
		getOne: (id: number) => ({
			queryKey: queriesKeys.news.single(id),
			queryFn: async () => db.getOne(id),
		}),
		create: (data: CreateNewsType) => ({
			mutationKey: queriesKeys.news.all,
			mutationFn: async () => db.create(data),
		}),
		update: (id: number, data: Partial<CreateNewsType>) => ({
			mutationKey: queriesKeys.news.single(id),
			mutationFn: async () => db.update(id, data),
		}),
		delete: (id: number) => ({
			mutationKey: queriesKeys.news.single(id),
			mutationFn: async () => db.delete(id),
		}),
	};
}
