import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router";
import { it } from "date-fns/locale/it";
import type { NewsType } from "~/lib/types";

export function NewsCard({
	article,
	featured = false,
	index,
}: {
	article: NewsType;
	featured?: boolean;
	index?: number;
}) {
	return (
		<Link to={`/news/${article.id}`} className="group block h-full">
			<div
				style={{ animationDelay: `${((index ?? 1) % 3) * 100}ms` }}
				className={`rounded-xl h-full opacity-0 overflow-hidden animate-fade-in-up transition-all duration-300 border-2  hover:border-primary hover:shadow-2xl ${featured ? "border-primary bg-primary/10" : "border-muted hover:bg-primary/5"}`}
			>
				<div className="relative aspect-video overflow-hidden">
					<img
						src={article.img}
						alt={article.title}
						className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
					/>

					<div className="absolute top-2 left-2 bg-secondary-foreground/80 backdrop-blur-xl shadow-sm border border-white rounded-full px-2 py-1">
						{article.src}
					</div>
				</div>

				<div className="flex flex-col h-[calc(100%-aspect-video)]">
					<div className="p-4 pb-2 space-y-2">
						<div className="flex items-center justify-between text-xs text-muted-foreground">
							<div className="flex items-center">
								<Calendar className="h-3 w-3 mr-1" />
								{format(
									new Date(article.published_at),
									"d MMM, yyyy",
									{
										locale: it,
									}
								)}
							</div>
							{article.location && (
								<div className="flex items-center">
									<MapPin className="h-3 w-3 mr-1" />
									{article.location}
								</div>
							)}
						</div>
						<h3
							className={`font-display font-bold leading-tight group-hover:text-primary transition-colors ${featured ? "text-2xl" : "text-lg"}`}
						>
							{article.title}
						</h3>
					</div>

					<div className="p-4 pt-0 grow">
						<p className="text-muted-foreground text-sm line-clamp-3">
							{article.description}
						</p>
					</div>

					<div className="p-4 pt-0 text-xs font-medium text-primary uppercase tracking-wider opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
						Read Full Story →
					</div>
				</div>
			</div>
		</Link>
	);
}
