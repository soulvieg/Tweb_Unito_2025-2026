import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import {
	Calendar,
	MapPin,
	Share2,
	ArrowLeft,
	Edit,
	Trash2,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router";
import CategorySelect from "~/components/CategorySelect";
import NewsDialog from "~/components/NewsDialog";
import Button, { MutateButton } from "~/components/ui/Button";
import Dialog, { useDialogControl } from "~/components/ui/Dialog";
import { ImagePicker, Input, Textarea } from "~/components/ui/Input";
import Skeleton from "~/components/ui/Skeleton";
import { useAuth } from "~/contexts/AuthContext";
import { queryClient } from "~/layouts/MainLayout";
import { queries } from "~/lib/Api/api";
import { palestinianNews } from "~/lib/constants";
import { is } from "~/lib/utils";

export default function NewsDetail() {
	const id = parseInt(useParams().id || "", 10);
	const { user } = useAuth();
	const { data: article, isPending } = useQuery(
		queries.news.getOne(id),
		queryClient,
	);

	const { data: category, isPending: isCategoryPending } = useQuery(
		{
			...queries.categories.getOne(article?.categoryId!),
			enabled: !!article,
		},
		queryClient,
	);

	const [mode, setMode] = useState<"update" | "delete">("update");
	const { isOpen, onOpen, onClose } = useDialogControl();

	if (isPending) {
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
						<div className="flex justify-between ">
							<Link to="/news" className="  w-fit">
								<Button className="mb-6 -ml-4  bg-transparent flex items-center gap-2 w-fit ">
									<ArrowLeft className="w-4 h-4 mr-2 text-gray-400" />
									<div className="text-gray-400">
										Back to News
									</div>
								</Button>
							</Link>
							{is(user).admin ? (
								<div className="flex items-start justify-center gap-2">
									<Button
										variant="outline"
										onClick={() => {
											setMode("update");
											onOpen();
										}}
									>
										<Edit className="w-4 h-4 mr-2" />
										Edit
									</Button>
									<Button
										variant="ghost"
										onClick={() => {
											setMode("delete");
											onOpen();
										}}
									>
										<Trash2 className="w-4 h-4 mr-2" />
										Delete
									</Button>
								</div>
							) : null}
						</div>

						<NewsDialog
							isOpen={isOpen}
							onClose={onClose}
							article={article}
							mode={mode}
						/>

						<div className="flex items-center gap-3 mb-6">
							<div className="text-sm py-1 px-3 rounded-full  bg-amber-600 flex items-center justify-center gap-2">
								{isCategoryPending ? (
									<Skeleton className="w-[50px] h-[16px] rounded-xl" />
								) : is(user).admin ? (
									<CategorySelect
										news={article}
										id="categoryId"
										label="Category"
									/>
								) : (
									category?.categoryName
								)}
								<div>/ {article.src}</div>
							</div>
						</div>

						<h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
							{article.title}
						</h1>

						<div className="flex items-center justify-between border-t pt-6 mt-8">
							<div className="flex items-center text-muted-foreground">
								<Calendar className="w-4 h-4 mr-2" />
								{format(
									new Date(article.published_at),
									"d MMMM, yyyy",
									{ locale: it },
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
							src={article.img}
							alt={article.title}
							className="w-full h-full object-cover"
						/>
					</div>
				</div>

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
