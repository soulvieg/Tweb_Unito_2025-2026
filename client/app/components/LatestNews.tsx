import React from "react";
import { Link } from "react-router";
import Button from "./ui/Button";
import { ArrowRight } from "lucide-react";
import Skeleton from "./ui/Skeleton";
import { palestinianNews } from "~/lib/constants";
import { NewsCard } from "./NewsCard";
import { queries } from "~/lib/Api/api";
import { queryClient } from "~/layouts/MainLayout";
import { useQuery } from "@tanstack/react-query";
import type { NewsType } from "~/lib/types";

export default function LatestNews() {
	const { data: latest, isPending } = useQuery(
		queries.news.getAll(),
		queryClient,
	);
	return (
		<div className="py-16 md:py-24 container mx-auto px-4 border-t-4 border-primary bg-primary-foreground ">
			<div className="flex max-md:flex-col items-center justify-between mb-12">
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

			{isPending ? (
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
			) : !latest || latest?.length === 0 ? (
				<div className="text-center py-20 animate-fade-in-up">
					<h3 className="text-xl font-bold text-muted-foreground">
						No articles found matching your search.
					</h3>
				</div>
			) : (
				<div className="w-full">
					<div className="-ml-4 flex max-md:flex-col gap-4 bg-primary-foreground">
						{latest?.slice(0, 3).map((article: NewsType) => (
							<div
								key={article.newsId}
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
