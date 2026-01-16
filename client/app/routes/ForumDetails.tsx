import { format } from "date-fns";
import { ArrowLeft, Loader2, MessageSquare, User } from "lucide-react";
import { Link, useParams } from "react-router";
import Button from "~/components/ui/Button";
import { Card } from "~/components/ui/Card";
import Skeleton from "~/components/ui/Skeleton";
import { commentsList, postsList, usersList } from "~/lib/constants";
import type { CommentType } from "~/lib/types";

export default function PostsDetail() {
	const id = parseInt(useParams().id || "", 10);
	const { data: post, isLoading } = {
		data: postsList.find((post) => post.p_id === id),
		isLoading: false,
	}; //useQuery(queries.posts.get(id);

	const { data: comments, isLoading: isLoadingComments } = {
		data: commentsList.filter((comment) => comment.p_id === id),
		isLoading: false,
	}; //useQuery(queries.replies.getByThreadId(id));
	comments.sort(
		(a, b) =>
			new Date(a.creation_date).getTime() -
			new Date(b.creation_date).getTime()
	);

	const { data: author, isLoading: authorLoading } = {
		data: usersList.find((user) => user.u_id === post?.author),
		isLoading: false,
	};

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
			<div className="container mx-auto px-4 py-24 text-center">
				<h2 className="text-2xl font-bold mb-4">Thread Not Found</h2>
				<Link to="/forum">
					<Button variant="outline">Back to Forum</Button>
				</Link>
			</div>
		);
	}

	return (
		<>
			<div className="bg-muted/20 border-b">
				<div className="container mx-auto px-4 py-8">
					<Link
						to="/forum"
						className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors"
					>
						<ArrowLeft className="w-4 h-4 mr-1" /> Back to Forum
					</Link>
					<h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
						{post.title}
					</h1>
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
							{format(
								new Date(post.creation_date),
								"MMMM d, yyyy 'at' h:mm a"
							)}
						</span>
						<span>•</span>
						<span className="flex items-center gap-1">
							<MessageSquare className="w-3 h-3" />{" "}
							{post.replies_count} replies
						</span>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-8 max-w-4xl">
				<div className="space-y-8">
					{/* Posts List */}
					<div className="space-y-6">
						{isLoadingComments ? (
							<div className="space-y-6">
								<Skeleton className="h-32 w-full rounded-xl" />
								<Skeleton className="h-24 w-full rounded-xl" />
								<Skeleton className="h-24 w-full rounded-xl" />
							</div>
						) : comments?.length === 0 ? (
							<div className="text-center py-12 border rounded-xl border-dashed">
								<p className="text-muted-foreground">
									No replies yet. Be the first to join the
									conversation.
								</p>
							</div>
						) : (
							comments?.map((comment) => (
								<CommentCard
									key={comment.c_id}
									comment={comment}
								/>
							))
						)}
					</div>

					<div className="my-8 bg-gray-400 h-[1px] w-full" />

					{/* Reply Form */}
					<div className="bg-muted/30 p-6 rounded-2xl border">
						<h3 className="text-lg font-semibold mb-4">
							Leave a Reply
						</h3>
						<ReplyForm threadId={post.p_id} />
					</div>
				</div>
			</div>
		</>
	);
}

function CommentCard({ comment }: { comment: CommentType }) {
	const { data: author, isLoading } = {
		data: usersList.find((user) => user.u_id === comment.u_id),
		isLoading: false,
	}; //useQuery(queries.users.get(comment.u_id);
	return (
		<Card className="overflow-hidden border-none shadow-none bg-transparent">
			<div className="flex gap-4">
				<div className="flex-shrink-0">
					<div className="flex items-center gap-2">
						<div className="h-6 w-6 rounded-full bg-gray-500 p-5 border-gray-300 border flex items-center justify-center text-white text-sm font-semibold">
							{author?.username.slice(0, 2).toUpperCase() || (
								<User />
							)}
						</div>
					</div>
				</div>
				<div className="flex-grow space-y-2">
					<div className="flex justify-between">
						<span className="font-medium text-foreground">
							{isLoading ? (
								<Skeleton className="h-3 w-15" />
							) : (
								author?.username || "Unknown User"
							)}
						</span>
						<div className="flex items-center justify-between">
							{/* <span className="font-semibold text-sm">
							{comment.u_id}
						</span> */}
							<span className="text-xs text-muted-foreground">
								{format(
									new Date(comment.creation_date),
									"MMM d, h:mm a"
								)}
							</span>
						</div>
					</div>
					<div className="text-sm leading-relaxed p-4 bg-card border rounded-r-xl rounded-bl-xl shadow-sm">
						{comment.text}
					</div>
				</div>
			</div>
		</Card>
	);
}

function ReplyForm({ threadId }: { threadId: number }) {
	return (
		<>
			<form onSubmit={() => {}} className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="md:col-span-1">
						<label htmlFor="name">Name</label>
						<input
							id="name"
							placeholder="Display Name"
							className="bg-background"
						/>
						{/* <FormField
							control={form.control}
							name="author"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											placeholder="Display Name"
											{...field}
											className="bg-background"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/> */}
					</div>
				</div>
				<label htmlFor="reply" className="sr-only">
					Comment
				</label>
				<textarea
					id="reply"
					name="content"
					placeholder="Share your thoughts respectfully..."
					className="min-h-[120px] bg-background resize-y"
				/>

				{/* <FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Comment</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Share your thoughts respectfully..."
									className="min-h-[120px] bg-background resize-y"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/> */}

				<div className="flex justify-end">
					<Button type="submit" disabled={false}>
						{false ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Posting...
							</>
						) : (
							"Post Reply"
						)}
					</Button>
				</div>
			</form>
		</>
	);
}
