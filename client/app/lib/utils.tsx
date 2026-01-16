import type { PropsWithChildren } from "react";

export function cn(...classes: string[]) {
	return classes.join(" ");
}

export type ClassNameType = { className?: string };

export type ChildrenWithClassNameType = PropsWithChildren & ClassNameType;
