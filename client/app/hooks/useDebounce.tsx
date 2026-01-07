import React, { useEffect, useState } from "react";

export default function useDebounce<T>({
	value,
	delay = 500,
}: {
	value: T;
	delay?: number;
}) {
	const [debounced, setDebounced] = useState<T>(value);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebounced(value);
		}, delay);

		return () => clearTimeout(timer);
	}, [value, delay]);

	return debounced;
}
