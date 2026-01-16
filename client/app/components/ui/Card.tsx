import React from "react";
import { cn, type ChildrenWithClassNameType } from "~/lib/utils";

export function Card({ children, className }: ChildrenWithClassNameType) {
	return (
		<div
			className={cn(
				"rounded-xl border bg-card border-card-border text-card-foreground shadow-sm",
				className ?? ""
			)}
		>
			{children}
		</div>
	);
}

export function CardHeader({ children, className }: ChildrenWithClassNameType) {
	return (
		<div className={cn("flex flex-col space-y-1.5 p-6", className ?? "")}>
			{children}
		</div>
	);
}

export function CardTitle({ children, className }: ChildrenWithClassNameType) {
	return (
		<div
			className={cn(
				"text-2xl font-semibold leading-none tracking-tight",
				className ?? ""
			)}
		>
			{children}
		</div>
	);
}


export function CardContent({ children, className }: ChildrenWithClassNameType) {
    return (
        <div className={cn("p-6 pt-0", className ?? "")}>{children}</div>
    );
}