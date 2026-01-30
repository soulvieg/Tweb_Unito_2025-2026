import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowLeft, MessageSquare, User } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { CommentCard } from "~/components/CommentCard";
import { ReplyForm } from "~/components/ReplyForm";
import ReportDialog from "~/components/ReportDialog";
import Button from "~/components/ui/Button";
import Dialog, { useDialogControl } from "~/components/ui/Dialog";
import Skeleton from "~/components/ui/Skeleton";
import { useAuth } from "~/contexts/AuthContext";
import { queryClient } from "~/layouts/MainLayout";
import { queries } from "~/lib/Api/api";
import type { CommentType } from "~/lib/types";

export default function PostsDetail() {
	const id = parseInt(useParams().id || "-1");
	const { user } = useAuth();
	// const { data: post, isLoading } = {
	// 	data: postsList.find((post) => post.postId === id),
	// 	isLoading: false,
	// };
	// const { data: comments, isLoading: isLoadingComments } = {
	// 	data: commentsList.filter((comment) => comment.postId === id),
	// 	isLoading: false,
	// };

	const [currentComment, setCurrentComment] = useState<
		CommentType | undefined
	>();
	const { isOpen, onClose, onOpen } = useDialogControl();

	const { data: post, isLoading } = useQuery(
		{ ...queries.posts.getOne(id), enabled: id !== -1 },
		queryClient,
	);
	const { data: comments, isLoading: isLoadingComments } = useQuery(
		{ ...queries.comments.getAll(id), enabled: id !== -1 },
		queryClient,
	);

	const { data: author, isLoading: authorLoading } = useQuery({
		queryKey: queries.users.getOne(post?.author!).queryKey,
		queryFn: queries.users.getOne(post?.author!).queryFn,
		enabled: !!post,
	});

	if (isLoading) {
		return (
			<div className="container mx-auto px-4 py-12">
				<Skeleton className="h-8 w-64 mb-4" />
				<Skeleton className="h-4 w-32 mb-8" />
				<div className="space-y-6">
					<Skeleton className="h-32 w-full rounded-xl" />
					<Skeleton className="h-24 w-full rounded-xl" />
					<Skeleton className="h-24 w-full rounded-xl" />
				</div>
			</div>
		);
	}

	if (!post) {
		return (
			<div className="container mx-auto px-4 py-24 text-center min-h-[60vh] grid place-items-center">
				<div>
					<h2 className="text-2xl font-bold mb-4">
						Thread Not Found
					</h2>
					<Link to="/forum">
						<Button variant="outline">Back to Forum</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-[60vh]">
			<ReportDialog
				mode="create"
				isOpen={isOpen}
				onClose={onClose}
				comment={currentComment}
			/>
			<div className="bg-muted/20 border-b">
				<div className="container mx-auto px-4 py-8">
					<Link
						to="/forum"
						className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors"
					>
						<ArrowLeft className="w-4 h-4 mr-1" /> Back to Forum
					</Link>
					<div className="flex items-center justify-between">
						<h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
							{post.title}
						</h1>
					</div>
					<div className="flex items-center text-sm text-muted-foreground gap-4">
						<div className="flex items-center gap-2">
							<div className="h-6 w-6">
								<User />
							</div>
							<span className="font-medium text-foreground">
								{authorLoading ? (
									<Skeleton className="h-3 w-15 rounded-full" />
								) : (
									author?.username || "Unknown User"
								)}
							</span>
						</div>
						<span>•</span>
						<span>
							{post.creationDate?.toString()
							// format(
							// 	new Date(post.creationDate),
							// 	"MMMM d, yyyy 'at' h:mm a",
							// )
							}
						</span>
						<span>•</span>
						<span className="flex items-center gap-1">
							<MessageSquare className="w-3 h-3" />{" "}
							{post.repliesCount} replies
						</span>
					</div>
					<div className="text-gray-200 border border-gray-200 p-2 mt-2 rounded-lg w-fit">
						{post.text}
					</div>
				</div>
			</div>
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				<div className="space-y-8">
					<div className="space-y-6">
						{isLoadingComments ? (
							<div className="space-y-6">
								<Skeleton className="h-32 w-full rounded-xl" />
								<Skeleton className="h-24 w-full rounded-xl" />
								<Skeleton className="h-24 w-full rounded-xl" />
							</div>
						) : !comments || comments?.length === 0 ? (
							<div className="text-center py-12 border rounded-xl border-dashed">
								<p className="text-muted-foreground">
									No replies yet. Be the first to join the
									conversation.
								</p>
							</div>
						) : (
							comments
								.sort(
									(a, b) =>
										new Date(b.creationDate).getTime() -
										new Date(a.creationDate).getTime(),
								)
								.map((comment) => (
									<CommentCard
										key={comment.commentId}
										comment={comment}
										onReport={(c) => {
											setCurrentComment(c);
											onOpen();
										}}
									/>
								))
						)}
					</div>

					<div className="my-8 bg-gray-400 h-[1px] w-full" />

					{user ? (
						<div className="bg-muted/30 p-6 rounded-2xl border">
							<h3 className="text-lg font-semibold mb-4">
								Leave a Reply
							</h3>
							<ReplyForm postId={post.postId} />
						</div>
					) : (
						<div className="w-full flex justify-end">
							<div className="shadow-lg  uppercase font-bold">
								Login to Participate
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
