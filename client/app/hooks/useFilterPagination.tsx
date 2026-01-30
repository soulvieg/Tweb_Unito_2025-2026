import React, { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

export default function useFilterPagination<T>({
	keysToSearch,
	itemsPerPage,
	items,
}: {
	keysToSearch: (keyof T)[];
	itemsPerPage?: number;
	items: T[] | undefined;
}) {
	const [page, setPage] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");

	const filtered = items?.filter((article) => {
		const c = keysToSearch
			.filter((x) => typeof article[x] === "string")
			.map((x) =>
				(article[x] as string)
					.toLowerCase()
					.includes(searchTerm.toLowerCase()),
			)
			.reduce((prev, curr) => prev || curr, false);
		return c;
	});
	const length = itemsPerPage ?? filtered?.length ?? 0;

	useEffect(() => {
		setPage(0);
	}, [searchTerm]);

	const next = () => {
		if ((page + 1) * length >= (filtered?.length ?? 0)) return;
		setPage(page + 1);
	};
	const prev = () => {
		if (page <= 0) return;
		setPage(page - 1);
	};
	const canPrev = page > 0;
	const canNext = (page + 1) * length < (filtered?.length ?? 0);
	return {
		paginatedItems: filtered?.slice(page * length, page * length + length),
		next,
		prev,
		canNext,
		canPrev,
		onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) =>
			setSearchTerm(e.target.value),
		filter: searchTerm,
	};
}
