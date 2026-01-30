import React, { useState, type Dispatch, type SetStateAction } from "react";

export type ErrorFormType<T> = Partial<Record<keyof T, string>>;
export type UseFormReturn<T extends Record<string, any>> = {
	state: T;
	setState: Dispatch<SetStateAction<T>>;
	errors: ErrorFormType<T>;
	setErrors: Dispatch<SetStateAction<ErrorFormType<T>>>;
	reset: () => void;
};

export default function useForm<T extends Record<string, any>>(
	initialState: T,
): UseFormReturn<T> {
	const [state, setState] = useState(initialState);
	const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
	const reset = () => {
		setState(initialState);
		setErrors({});
	};

	return { state, setState, errors, setErrors, reset };
}
