import React, { useEffect, useState } from "react";

export default function usePagination<T>({
	itemsPerPage,
	items,
}: {
	itemsPerPage: number;
	items: T[];
}) {
	const [page, setPage] = useState(0);

	useEffect(() => {
		setPage(0);
	}, [items]);

	const next = () => {
		if ((page + 1) * itemsPerPage >= items.length) return;
		setPage(page + 1);
	};
	const prev = () => {
		if (page <= 0) return;
		setPage(page - 1);
	};
	const canPrev = page > 0;
	const canNext = (page + 1) * itemsPerPage < items.length;
	return {
		paginatedItems: items.slice(
			page * itemsPerPage,
			page * itemsPerPage + itemsPerPage
		),
		next,
		prev,
		canNext,
		canPrev,
	};
}
