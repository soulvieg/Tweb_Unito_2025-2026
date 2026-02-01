import React, { type Dispatch, type SetStateAction } from "react";
import {
	common,
	Input,
	type InputProps,
	type SelectProps,
	type TextareaProps,
} from "./Input";
import { cn } from "~/lib/utils";
import type { ErrorFormType, UseFormReturn } from "~/hooks/useForm";
import { AlertTriangle } from "lucide-react";

export function FieldInput<T extends Record<string, any>>({
	id,
	label,
	state,
	setState,
	setErrors,
	errors,
	...rest
}: Omit<InputProps, "id"> &
	UseFormReturn<T> & {
		id: keyof T;
	}) {
	return (
		<div className="flex flex-col gap-1">
			{label ? <label htmlFor={id as string}>{label}</label> : null}
			<input
				value={state[id]?.toString() ?? undefined}
				onChange={(v) => {
					setState((prev) => ({
						...prev,
						[id]: v.target.value as T[keyof T],
					}));
				}}
				id={id as string}
				name={id as string}
				{...rest}
				className={cn(common, rest.className ?? "")}
			/>

			<div
				className={cn(
					"tansition-all text-red-600 font-bold text-sm flex gap-2",
					Object.keys(errors).includes(id as string)
						? "opacity-100"
						: "opacity-0",
				)}
			>
				<>
					<AlertTriangle className="size-4" />
					<div>{errors[id] ?? ""}</div>
				</>
			</div>
		</div>
	);
}

export function FieldTextarea<T extends Record<string, any>>({
	id,
	label,
	state,
	setState,
	setErrors,
	errors,
	...rest
}: Omit<TextareaProps, "id"> &
	UseFormReturn<T> & {
		id: keyof T;
	}) {
	return (
		<div className="flex flex-col gap-1">
			{label ? <label htmlFor={id as string}>{label}</label> : null}
			<textarea
				value={state[id]?.toString() ?? undefined}
				onChange={(v) => {
					setState((prev) => ({
						...prev,
						[id]: v.target.value as T[keyof T],
					}));
				}}
				id={id as string}
				name={id as string}
				{...rest}
				className={cn(common, rest.className ?? "")}
			/>

			<div
				className={cn(
					"tansition-all text-red-600 font-bold text-sm flex gap-2",
					Object.keys(errors).includes(id as string)
						? "opacity-100"
						: "opacity-0",
				)}
			>
				<>
					<AlertTriangle className="size-4" />
					<div>{errors[id] ?? ""}</div>
				</>
			</div>
		</div>
	);
}

export function FieldSelect<T extends Record<string, any>>({
	id,
	label,
	state,
	setState,
	setErrors,
	errors,
	...rest
}: Omit<SelectProps, "id"> &
	UseFormReturn<T> & {
		id: keyof T;
	}) {
		console.log(state);
	return (
		<div className="flex flex-col gap-1">
			{label ? <label htmlFor={id as string}>{label}</label> : null}
			<select
				value={state[id]?.toString() ?? 0}
				onChange={(v) => {
					setState((prev) => ({
						...prev,
						[id]: parseInt(v.target.value),
					}));
				}}
				id={id as string}
				name={id as string}
				{...rest}
				className={cn(common, rest.className ?? "")}
			>
				{rest.options?.map((x) => (
					<option key={rest.name + "_" + x.value} value={x.value}>
						{x.label}
					</option>
				))}
			</select>

			<div
				className={cn(
					"tansition-all text-red-600 font-bold text-sm flex gap-2",
					Object.keys(errors).includes(id as string)
						? "opacity-100"
						: "opacity-0",
				)}
			>
				<>
					<AlertTriangle className="size-4" />
					<div>{errors[id] ?? ""}</div>
				</>
			</div>
		</div>
	);
}
