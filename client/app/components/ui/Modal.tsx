"use client";
import React, { useEffect, useState, type PropsWithChildren } from "react";
import { cn } from "~/lib/utils";

export function useModalControl() {
	const [isOpen, setIsOpen] = React.useState(false);

	return {
		isOpen,
		onOpen: () => setIsOpen(true),
		onClose: () => setIsOpen(false),
	};
}

export default function Modal({
	isOpen,
	onClose,
	children,
	title,
}: {
	isOpen: boolean;
	onClose: () => void;
	title: string;
} & PropsWithChildren) {
	const [isVisible, setIsVisible] = useState(isOpen);

	useEffect(() => {
		if (isOpen) {
			setIsVisible(true);
		}
	}, [isOpen]);

	return (
		<>
			{isOpen ? (
				<div
					className={cn(
						"fixed inset-0 z-999 top-0 left-0 -mt-20  flex items-center justify-center backdrop-blur-sm bg-black/30  text-white transition-all",
						isVisible ? "animate-fade-in" : "animate-fade-out"
					)}
					style={{
						animationDuration: "0.3s",
					}}
					// 5. When any animation ends (in or out)
					onAnimationEnd={() => {
						// If we just finished the "close" animation, now we can unmount
						if (!isVisible) onClose();
					}}
				>
					<div
						className={cn("absolute w-screen h-screen  z-999")}
						onClick={() => setIsVisible(false)}
					/>
					<div
						className={cn(
							" max-w-3xl min-w-sm opacity-0 z-[1000] bg-background border border-slate-800 rounded-xl shadow-lg p-6 m-4 ",
							isVisible
								? "animate-fade-in-up"
								: "animate-fade-out-down"
						)}
						style={{
							animationDelay: "0.3s",
							animationDuration: "0.2s",
						}}
					>
						<div className="text-2xl w-full border-b border-b-slate-800 mb-5 pb-2 font-bold">
							{title}
						</div>
						<div>{children}</div>
					</div>
				</div>
			) : null}
		</>
	);
}
