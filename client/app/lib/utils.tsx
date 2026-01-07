export function cn(...classes: string[]) {
	return classes.join(" ");
}

export type ClassNameType = { className?: string };
