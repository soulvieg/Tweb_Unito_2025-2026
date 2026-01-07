import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { NewsCard } from "~/components/NewsCard";
import Button from "~/components/ui/Button";
import Skeleton from "~/components/ui/Skeleton";
import useDebounce from "~/hooks/useDebounce";
import useFilter from "~/hooks/useFilter";
import usePagination from "~/hooks/usePagination";
import { palestinianNews } from "~/lib/constants";

export default function News() {
	const { filteredItems, filter, onFilterChange, debouncedValue } = useFilter(
		{
			keysToSearch: ["title", "description"],
			items: palestinianNews,
		}
	);
	const { paginatedItems, next, prev, canPrev, canNext } = usePagination({
		itemsPerPage: 6,
		items: filteredItems,
	});

	const isLoading = false;

	return (
		<div className="relative bg-primary-foreground">
			<div className="bg-muted/20 border-b py-12 md:py-20 bg-secondary-foreground">
				<div className="container mx-auto px-4 text-center max-w-3xl">
					<h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
						Newsroom
					</h1>
					<p className="text-xl text-muted-foreground mb-8">
						Comprehensive coverage and neutral reporting on the
						latest developments.
					</p>
					<div className="relative max-w-md mx-auto">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
						<input
							className="pl-10 h-12 rounded-xl bg-background shadow-sm w-md bg-primary-foreground border border-slate-800"
							placeholder="Search news..."
							value={filter}
							onChange={onFilterChange}
						/>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-12 ">
				{isLoading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[1, 2, 3, 4, 5, 6].map((i) => (
							<div key={i} className="space-y-4">
								<Skeleton className="h-48 w-full rounded-xl" />
								<div className="space-y-2">
									<Skeleton className="h-6 w-3/4" />
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-2/3" />
								</div>
							</div>
						))}
					</div>
				) : paginatedItems?.length === 0 ? (
					<div className="text-center py-20 animate-fade-in">
						<h3 className="text-xl font-bold text-muted-foreground">
							No articles found matching your search.
						</h3>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{paginatedItems?.map((article, i) => (
							<NewsCard
								key={article.id + debouncedValue}
								article={article}
								index={i}
							/>
						))}
					</div>
				)}
			</div>
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
		</div>
	);
}
