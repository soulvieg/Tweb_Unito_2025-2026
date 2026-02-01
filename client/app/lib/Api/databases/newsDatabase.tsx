import type { CreateNewsType, DatabaseType, NewsType } from "../../types";
import { ax, database } from "../api";
import { queriesKeys } from "../queriesKeys";

const path = "news";

const db: DatabaseType<NewsType, CreateNewsType> = database({
	path: path,
});

export function newsQueries() {
	return {
		getAll: () => ({
			queryKey: queriesKeys.news.all,
			queryFn: async () =>
				await ax
					.get<NewsType[]>(`/news`)
					.then((res) =>
						res.data?.sort(
							(a, b) =>
								new Date(b.published_at).getTime() -
								new Date(a.published_at).getTime(),
						),
					)
					.catch((e) => {
						console.error("Error fetching item:", e);
						throw e;
					}),
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
		changeCategory: (id: number) => ({
			mutationKey: queriesKeys.news.single(id),
			mutationFn: async (newCategoryId: number) =>
				await ax
					.put<NewsType>(`/news/${id}/changeCategory`, newCategoryId)
					.then((res) => res.data)
					.catch((e) => {
						console.error("Error fetching item:", e);
						throw e;
					}),
		}),
	};
}
