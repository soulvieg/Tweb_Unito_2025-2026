import { Loader2 } from "lucide-react";
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

type ButtonProps = {
	variant?: StyleType;
	size?: SizesType;
	noStyle?: boolean;
} & PropsWithChildren &
	ClassNameType &
	ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
	children,
	className,
	variant = "destructive",
	size = "default",
	noStyle = false,
	...rest
}: ButtonProps) {
	return (
		<button
			className={
				!noStyle
					? cn(
							"inline-flex items-center justify-center transition-all gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
							"hover:-translate-y-1 hover:shadow hover:shadow-secondary border-2 border-primary  active-elevate-2 cursor-pointer active:translate-y-0  active:shadow-none hover:brightness-110",
							"disabled:opacity-70 disabled:pointer-events-none",
							styles[variant as StyleType] ?? "",
							sizes[size as SizesType] ?? "",
							className ?? "",
						)
					: (className ?? "")
			}
			{...rest}
		>
			{children}
		</button>
	);
}

export function MutateButton({
	isPending,
	children,
	...rest
}: ButtonProps & { isPending: boolean }) {
	return (
		<Button {...rest} disabled={isPending}>
			{isPending ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
				</>
			) : (
				children
			)}
		</Button>
	);
}
