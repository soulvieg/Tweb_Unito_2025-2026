import React, { useState, type PropsWithChildren } from "react";
import { cn } from "~/lib/utils";

export default function Tooltip({
	children,
	tooltip,
}: PropsWithChildren & { tooltip: string }) {
	const [hover, setHover] = useState(false);
	return (
		<div
			className="relative "
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			{children}
			<div
				className={cn(
					"absolute z-800 transition-all text-sm w-max -translate-x-[40%] translate-y-[10%]  bg-slate-700 border border-gray-400  p-2 rounded-lg",
					hover ? "scale-100" : "scale-0",
				)}
			>
				{tooltip}
			</div>
		</div>
	);
}
