import React, {
	type ButtonHTMLAttributes,
	type PropsWithChildren,
} from "react";
import { cn, type ClassNameType } from "~/lib/utils";

type StyleType = "default" | "ghost" | "destructive" | "outline" | "secondary";
type SizesType = "default" | "sm" | "lg" | "icon";

const styles: Record<StyleType, string> = {
	default: "bg-primary text-primary-foreground border border-primary-border",
	destructive:
		"bg-destructive text-destructive-foreground border border-destructive-border",
	outline:
		" border border-primary bg-secondary-foreground text-primary shadow-xs active:shadow-none ",
	secondary:
		"border bg-secondary text-secondary-foreground border border-secondary-border ",
	ghost: "border border-transparent",
};

const sizes: Record<SizesType, string> = {
	default: "min-h-9 px-4 py-2",
	sm: "min-h-8 rounded-md px-3 text-xs",
	lg: "min-h-10 rounded-md px-8",
	icon: "h-9 w-9",
};

export default function Button({
	children,
	className,
	variant = "destructive",
	size = "default",
	...rest
}: { variant?: StyleType; size?: SizesType } & PropsWithChildren &
	ClassNameType &
	ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			className={cn(
				"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" +
					"  active-elevate-2 cursor-pointer active:scale-95 hover:brightness-110",
				styles[variant as StyleType] ?? "",
				sizes[size as SizesType] ?? "",
				className ?? ""
			)}
			{...rest}
		>
			{children}
		</button>
	);
}
