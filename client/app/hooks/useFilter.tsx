import React, { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

export default function useFilter<T extends object>({
	keysToSearch,
	items,
	debouncedDelay = 500,
}: {
	keysToSearch: (keyof T)[];
	items: T[];
	debouncedDelay?: number;
}) {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredItems, setFilteredItems] = useState<T[]>(items);
	const debouncedValue = useDebounce({
		value: searchTerm,
		delay: debouncedDelay,
	});

	useEffect(() => {
		if (debouncedValue) {
			setFilteredItems(
				items.filter((article) => {
					const c = keysToSearch
						.filter((x) => typeof article[x] == "string")
						.map((x) =>
							(article[x] as string)
								.toLowerCase()
								.includes(searchTerm.toLowerCase())
						)
						.reduce((prev, curr) => prev || curr, false);
					return c;
				})
			);
		} else setFilteredItems(items);
	}, [debouncedValue]);

	return {
		onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) =>
			setSearchTerm(e.target.value),
		filter: searchTerm,
		filteredItems: filteredItems,
		debouncedValue,
	};
}
