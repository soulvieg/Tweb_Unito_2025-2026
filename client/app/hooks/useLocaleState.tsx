import React, { useState } from "react";

export default function useLocaleState<T>({
	key,
	defaultValue,
}: {
	key: string;
	defaultValue: T;
}): [T, (newVal: T) => void] {
	const [val, setVal] = useState<T>(
		typeof window === "undefined"
			? defaultValue
			: (JSON.parse(localStorage.getItem(key) ?? "null") ?? defaultValue),
	);

	const setLocaleVal = (newVal: T) => {
		if (newVal === undefined || newVal === null) {
			localStorage.removeItem(key);
		} else {
			localStorage.setItem(key, JSON.stringify(newVal));
		}
		setVal(newVal);
	};

	return [val, setLocaleVal];
}
