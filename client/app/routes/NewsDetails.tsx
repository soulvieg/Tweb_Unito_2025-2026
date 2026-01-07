import { format } from "date-fns";
import { it } from "date-fns/locale";
import { Calendar, MapPin, Share2, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";
import Button from "~/components/ui/Button";
import Skeleton from "~/components/ui/Skeleton";
import { palestinianNews } from "~/lib/constants";

export default function NewsDetail() {
	const { id } = useParams();
	const isLoading = false;
	const article = palestinianNews.find((article) => article.id === id);
	if (isLoading) {
		return (
			<div className="min-h-screen">
				<div className="container mx-auto px-4 py-12 max-w-4xl">
					<Skeleton className="h-8 w-32 mb-6" />
					<Skeleton className="h-12 w-3/4 mb-4" />
					<Skeleton className="aspect-video w-full rounded-2xl mb-8" />
					<div className="space-y-4">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-2/3" />
					</div>
				</div>
			</div>
		);
	}

	if (!article) {
		return (
			<div>
				<div className="container mx-auto px-4 py-24 text-center min-h-screen grid place-items-center">
					<div>
						<h2 className="text-2xl font-bold mb-4">
							Article Not Found
						</h2>
						<Link to="/news">
							<Button>Back to News</Button>
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<article className="min-h-screen pb-20">
				{/* Header Section */}
				<div className="bg-muted/10 border-b">
					<div className="container mx-auto px-4 py-12 max-w-4xl">
						<Link to="/news" className="  w-fit">
							<Button className="mb-6 -ml-4  bg-transparent flex items-center gap-2 w-fit ">
								<ArrowLeft className="w-4 h-4 mr-2 text-gray-400" />
								<div className="text-gray-400">
									Back to News
								</div>
							</Button>
						</Link>

						<div className="flex items-center gap-3 mb-6">
							{/* badge */}
							<div className="text-sm py-1 px-3 rounded-full  bg-amber-600">
								{article.source}
							</div>
						</div>

						<h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
							{article.title}
						</h1>

						<div className="flex items-center justify-between border-t pt-6 mt-8">
							<div className="flex items-center text-muted-foreground">
								<Calendar className="w-4 h-4 mr-2" />
								{format(
									new Date(article.date),
									"d MMMM, yyyy",
									{ locale: it }
								)}
							</div>
							{article.location && (
								<div className="flex items-center text-sm text-muted-foreground">
									<MapPin className="w-4 h-4 mr-1" />
									{article.location}
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Featured Image */}
				<div className="container mx-auto px-4 max-w-5xl -mt-8 mb-12">
					<div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
						<img
							src={article.image}
							alt={article.title}
							className="w-full h-full object-cover"
						/>
					</div>
				</div>

				{/* Content */}
				<div className="container mx-auto px-4 max-w-3xl">
					<div className="prose prose-lg prose-slate max-w-none">
						<p className="lead text-xl md:text-2xl text-muted-foreground mb-8 font-serif italic">
							{article.description}
						</p>
						<div className="whitespace-pre-wrap font-serif text-lg leading-relaxed">
							{article.content}
						</div>
					</div>
				</div>
			</article>
		</>
	);
}
