import React from "react";
import Button from "./ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function NavigationButton({
	prev,
	next,
	canPrev,
	canNext,
}: {
	prev: () => void;
	next: () => void;
	canPrev: boolean;
	canNext: boolean;
}) {
	return (
		<div className="flex gap-2 mx-auto w-fit items-center pb-10">
			<Button
				className="bg-transparent text-white border border-gray-300 rounded-full"
				onClick={prev}
				disabled={!canPrev}
			>
				<ArrowLeft />
			</Button>
			<Button
				className="bg-transparent text-white border border-gray-300 rounded-full"
				onClick={next}
				disabled={!canNext}
			>
				<ArrowRight />
			</Button>
		</div>
	);
}
