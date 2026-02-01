import { use, useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router";
import { MessageSquare, Users, Clock, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { queries } from "~/lib/Api/api";
import Button from "~/components/ui/Button";
import Skeleton from "~/components/ui/Skeleton";
import type { PostType } from "~/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { useDialogControl } from "~/components/ui/Dialog";
import useFilterPagination from "~/hooks/useFilterPagination";
import NavigationButton from "~/components/NavigationButton";
import { useAuth } from "~/contexts/AuthContext";
import { is } from "~/lib/utils";
import { queryClient } from "~/layouts/MainLayout";
import ForumDialog from "~/components/ForumDialog";

export default function Forum() {
	const { user } = useAuth();
	const { isOpen, onClose, onOpen } = useDialogControl();
	const [post, setPost] = useState<PostType | undefined>();
	const [mode, setMode] = useState<"create" | "delete">("create");

	const { data: posts, isPending } = useQuery(
		queries.posts.getAll(),
		queryClient,
	);

	const { paginatedItems, next, prev, canPrev, canNext } =
		useFilterPagination({
			title: "forum",
			keysToSearch: ["title"],
			itemsPerPage: 4,
			items: posts,
		});

	return (
		<>
			<ForumDialog
				isOpen={isOpen}
				onClose={onClose}
				mode={mode}
				post={post}
			/>

			<div className="bg-muted/30 py-12 border-b">
				<div className="container mx-auto px-4">
					<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
						<div>
							<h1 className="text-4xl font-display font-bold mb-2 uppercase">
								Community Forum
							</h1>
							<p className="text-muted-foreground text-lg font-mono">
								SPEAK YOUR TRUTH. RESPECT THE DIALOGUE.
							</p>
						</div>

						{user ? (
							<Button
								onClick={() => {
									setMode("create");
									onOpen();
								}}
							>
								Start a Discussion
							</Button>
						) : null}
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
					<div className="lg:col-span-3 space-y-4">
						{isPending ? (
							[1, 2, 3, 4].map((i) => (
								<div
									key={i}
									className="flex items-center space-x-4 p-4 border rounded-xl"
								>
									<Skeleton className="h-12 w-12 rounded-full" />
									<div className="space-y-2 flex-1">
										<Skeleton className="h-4 w-[250px]" />
										<Skeleton className="h-4 w-[200px]" />
									</div>
								</div>
							))
						) : !posts || posts?.length === 0 ? (
							<div className="text-center py-20 border rounded-2xl bg-muted/10">
								<MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
								<h3 className="text-xl font-bold mb-2">
									No threads yet
								</h3>
								<p className="text-muted-foreground mb-6">
									Be the first to start a conversation.
								</p>
							</div>
						) : (
							paginatedItems?.map((post, i) => (
								<SinglePost
									index={i}
									key={post.postId}
									post={post}
									setPost={() => {
										setPost(post);
										setMode("delete");
										onOpen();
									}}
								/>
							))
						)}
						<NavigationButton
							prev={prev}
							next={next}
							canPrev={canPrev}
							canNext={canNext}
						/>
					</div>

					<div className="hidden lg:block space-y-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-lg">
									Guidelines
								</CardTitle>
							</CardHeader>
							<CardContent className="text-sm text-muted-foreground space-y-3">
								<p>
									1. Be respectful and civil to all members.
								</p>
								<p>
									2. Focus on facts and constructive dialogue.
								</p>
								<p>3. No hate speech or harassment.</p>
								<p>
									4. Cite sources when making factual claims.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</>
	);
}

function SinglePost({
	post,
	setPost,
	index,
}: {
	post: PostType;
	setPost: () => void;
	index: number;
}) {
	const { data: author, isPending: isAuthorLoading } = useQuery(
		{
			queryKey: ["post", "author", post.userId],
			queryFn: queries.users.getOne(post.userId).queryFn,
			enabled: !!post.userId,
		},
		queryClient,
	);
	const { user } = useAuth();
	return (
		<Link
			key={post.postId}
			to={`/forum/${post.postId}`}
			className="block group"
		>
			<div
				style={{ animationDelay: `${((index ?? 1) % 4) * 100}ms` }}
				className="hover:shadow-md animate-fade-in-up opacity-0 transition-all text-slate-300 border-slate-300/60 hover:border-primary/40 border-2 rounded-xl"
			>
				<div className="p-6">
					<div className="flex items-start justify-between max-md:flex-col max-md:items-center gap-4">
						<div className="space-y-1">
							<h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
								{post.title}
							</h3>
							<div className="flex items-center gap-4 text-sm text-muted-foreground">
								<span className="flex items-center gap-1">
									<Users className="w-3 h-3" />
									{isAuthorLoading ? (
										<Skeleton className="rounded-full w-15  h-3" />
									) : (
										author?.username
									)}
								</span>
								<span className="flex items-center gap-1">
									<Clock className="w-3 h-3" />
									{format(
										new Date(post.creationDate),
										"MMM d, yyyy",
									)}
								</span>
							</div>
						</div>
						<div className="flex items-center gap-4">
							{is(user).admin ? (
								<Button
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setPost();
									}}
									className="hover:-translate-y-1 hover:shadow shadow-secondary border-2 border-primary uppercase font-bold flex flex-col items-center justify-center  p-3"
								>
									<Trash2 className="size-6" />

									<span className="text-[10px] uppercase font-medium text-muted-foreground">
										Delete
									</span>
								</Button>
							) : null}
							<div className="flex flex-col items-center justify-center bg-muted/50 rounded-lg p-3 min-w-[4rem]">
								<span className="text-xl font-bold text-primary">
									{post.count_replies}
								</span>
								<span className="text-[10px] uppercase font-medium text-muted-foreground">
									Replies
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
