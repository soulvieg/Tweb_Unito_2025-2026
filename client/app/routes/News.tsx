import { useQuery } from "@tanstack/react-query";
import {  Search } from "lucide-react";
import { NewsCard } from "~/components/NewsCard";
import Button from "~/components/ui/Button";
import Skeleton from "~/components/ui/Skeleton";
import useFilterPagination from "~/hooks/useFilterPagination";
import { queries } from "~/lib/Api/api";
import NavigationButton from "~/components/NavigationButton";
import { queryClient } from "~/layouts/MainLayout";
import { useDialogControl } from "~/components/ui/Dialog";
import { useAuth } from "~/contexts/AuthContext";
import NewsDialog from "~/components/NewsDialog";
import { is } from "~/lib/utils";

export default function News() {
	const { data: news, isPending } = useQuery(
		queries.news.getAll(),
		queryClient,
	);
	const { user } = useAuth();

	const { isOpen, onClose, onOpen } = useDialogControl();

	const {
		paginatedItems,
		next,
		prev,
		canPrev,
		canNext,
		filter,
		onFilterChange,
	} = useFilterPagination({
		keysToSearch: ["title", "description"],
		itemsPerPage: 6,
		items: news,
	});
	return (
		<div className="relative bg-primary-foreground">
			<NewsDialog isOpen={isOpen} onClose={onClose} mode={"create"} />
			<div className="bg-muted/20 border-b py-12 md:py-20 bg-secondary-foreground">
				<div className="container mx-auto px-4 text-center max-w-3xl">
					<h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
						Newsroom
					</h1>
					<p className="text-xl text-muted-foreground mb-8">
						Comprehensive coverage and neutral reporting on the
						latest developments.
					</p>
					<div className="relative w-md max-md:w-xs mx-auto  ">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
						<input
							className="pl-10 h-12 rounded-xl bg-background shadow-sm md:w-md max-md:w-xs max-w-screen  bg-primary-foreground border border-slate-800"
							placeholder="Search news..."
							value={filter}
							onChange={onFilterChange}
						/>
					</div>
					{is(user).admin ? (
						<div className="mt-6">
							<Button onClick={onOpen}>Create News</Button>
						</div>
					) : null}
				</div>
			</div>

			<div className="container mx-auto px-4 py-12 ">
				{isPending ? (
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
				) : !paginatedItems || paginatedItems?.length === 0 ? (
					<div className="text-center py-20 animate-fade-in-up">
						<h3 className="text-xl font-bold text-muted-foreground">
							No articles found matching your search.
						</h3>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{paginatedItems?.map((article, i) => (
							<NewsCard
								key={article.newsId}
								article={article}
								index={i}
							/>
						))}
					</div>
				)}
			</div>
			<NavigationButton
				prev={prev}
				next={next}
				canPrev={canPrev}
				canNext={canNext}
			/>
		</div>
	);
}
