import type { JSX, PropsWithChildren } from "react";
import type { UserType } from "./types";
import type { ErrorFormType } from "~/hooks/useForm";
import type { AxiosError } from "axios";
import { type AddToast } from "~/contexts/ToastContext";

export function cn(...classes: string[]) {
	return classes.join(" ");
}

export type ClassNameType = { className?: string };

export type ChildrenWithClassNameType = PropsWithChildren & ClassNameType;

export function is(user: UserType | null) {
	return {
		admin: user && user.role === "admin",
		user: user && user.role === "user",
	};
}

export function validateRequired<T>(
	state: T,
	errors: ErrorFormType<T>,
	fields: (keyof T)[],
) {
	fields.forEach((f) => {
		if (typeof state[f] === "string" && state[f].trim().length === 0) {
			errors[f] = "This field is required";
		} else if (typeof state[f] !== "string" && !state[f]) {
			errors[f] = "This field is required";
		}
	});
}

export function errorCheck(
	error: AxiosError,
	toast: AddToast,
	message: string | JSX.Element,
) {
	console.log(error);
	if (error?.request["status"] !== 0) {
		console.error(error);
		toast.error({
			type: "error",
			message: message,
		});
	} else {
		toast.error({
			type: "error",
			message: "The server is down",
		});
	}

	return error;
}
