import React from "react";
import { cn, type ClassNameType } from "~/lib/utils";

export default function Skeleton({ className }: ClassNameType) {
	return <div className={cn("animate-pulse bg-gray-300", className ?? "")} />;
}
