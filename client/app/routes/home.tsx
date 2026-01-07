import type { Route } from "./+types/home";
import LatestNews from "~/components/LatestNews";
import Hero from "~/components/Hero";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Home() {
	return (
		<div className="relative">
			<div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden h-screen">
				<svg
					className="w-full h-full ab"
					viewBox="0 0 100 100"
					preserveAspectRatio="none"
				>
					<path
						d="M0,50 Q25,25 50,50 T100,50"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					/>
					<path
						d="M0,60 Q25,35 50,60 T100,60"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					/>
					<path
						d="M0,40 Q25,15 50,40 T100,40"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					/>
				</svg>
			</div>
			<section>
				<Hero />
			</section>

			<section className="bg-primary-foreground w-full">
				<LatestNews />
			</section>
		</div>
	);
}
