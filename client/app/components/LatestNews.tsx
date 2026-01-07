import React from "react";
import { Link } from "react-router";
import Button from "./ui/Button";
import { ArrowRight } from "lucide-react";
import Skeleton from "./ui/Skeleton";
import { palestinianNews } from "~/lib/constants";
import { NewsCard } from "./NewsCard";

export default function LatestNews() {
	const isLoading = false;
	return (
		<div className="py-16 md:py-24 container mx-auto px-4 border-t-4 border-primary bg-primary-foreground ">
			<div className="flex items-center justify-between mb-12">
				<div>
					<h2 className="text-4xl font-display font-black mb-2">
						FRONTLINE UPDATES
					</h2>
					<p className="text-foreground font-mono font-bold">
						Ground truth. Verified facts. No filter.
					</p>
				</div>
				<Link to="/news">
					<Button className="gap-2 hidden md:flex items-center bg-transparent text-white font-ibm hover:gap-4 transition-all origin-left mr-5 hover:mr-4 ">
						View All News <ArrowRight className="w-4 h-4" />
					</Button>
				</Link>
			</div>

			{isLoading ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{[1, 2, 3].map((i) => (
						<div key={i} className="space-y-4">
							<Skeleton className="h-48 w-full rounded-xl" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-3/4" />
								<Skeleton className="h-4 w-1/2" />
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="w-full">
					<div className="-ml-4 flex bg-primary-foreground">
						{palestinianNews?.slice(0, 3).map((article) => (
							<div
								key={article.id}
								className="pl-4 md:basis-1/2 lg:basis-1/3"
							>
								<div className="h-full">
									<NewsCard article={article} />
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			<div className="mt-8 text-center md:hidden">
				<Link to="/news">
					<Button className="gap-2">
						View All News <ArrowRight className="w-4 h-4" />
					</Button>
				</Link>
			</div>
		</div>
	);
}
