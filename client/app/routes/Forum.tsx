import { use, useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router";
import { MessageSquare, Users, Clock, Plus, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { queries } from "~/lib/api";
import Button from "~/components/ui/Button";
import Skeleton from "~/components/ui/Skeleton";
import type { PostType } from "~/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import Modal, { useModalControl } from "~/components/ui/Modal";
import { postsList, usersList } from "~/lib/constants";
import usePagination from "~/hooks/usePagination";
import useFilter from "~/hooks/useFilter";
import NavigationButton from "~/components/NavigationButton";

export default function Forum() {
	const { data: posts, isLoading } = { data: postsList, isLoading: false }; //useQuery(queries.posts.getAll);
	const { isOpen, onClose, onOpen } = useModalControl();

	const { filteredItems, filter, onFilterChange, debouncedValue } = useFilter(
		{
			keysToSearch: ["title"],
			items: posts,
		}
	);
	const { paginatedItems, next, prev, canPrev, canNext } = usePagination({
		itemsPerPage: 6,
		items: filteredItems,
	});

	const user = true;

	return (
		<>
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
						<Modal isOpen={isOpen} onClose={onClose} title="gino">
							ciaooooo
						</Modal>
						{user ? (
							<Button onClick={() => onOpen()}>
								Start a Discussion
							</Button>
						) : (
							<Link to="/login">
								<Button className="shadow-lg border-2 border-primary uppercase font-bold">
									Login to Participate
								</Button>
							</Link>
						)}
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
					<div className="lg:col-span-3 space-y-4">
						{isLoading ? (
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
						) : posts?.length === 0 ? (
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
							paginatedItems?.map((post) => (
								<SinglePost key={post.p_id} post={post} />
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

function SinglePost({ post }: { post: PostType }) {
	const { data: author, isLoading } = {
		data: usersList.find((user) => user.u_id === post.author),
		isLoading: false,
	}; //useQuery(queries.posts.getById, {p_id: post.p_id});
	return (
		<Link
			key={post.p_id}
			to={`/forum/${post.p_id}`}
			className="block group"
		>
			<div className="hover:shadow-md transition-all text-slate-300 border-slate-300/60 hover:border-primary/40 border-2 rounded-xl">
				<div className="p-6">
					<div className="flex items-start justify-between gap-4">
						<div className="space-y-1">
							<h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
								{post.title}
							</h3>
							<div className="flex items-center gap-4 text-sm text-muted-foreground">
								<span className="flex items-center gap-1">
									<Users className="w-3 h-3" />
									{isLoading ? (
										<Skeleton className="rounded-full w-15  h-3" />
									) : (
										author?.username
									)}
								</span>
								<span className="flex items-center gap-1">
									<Clock className="w-3 h-3" />
									{format(
										new Date(post.creation_date),
										"MMM d, yyyy"
									)}
								</span>
							</div>
						</div>
						<div className="flex flex-col items-center justify-center bg-muted/50 rounded-lg p-3 min-w-[4rem]">
							<span className="text-xl font-bold text-primary">
								{post.replies_count}
							</span>
							<span className="text-[10px] uppercase font-medium text-muted-foreground">
								Replies
							</span>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}

// function CreateThreadDialog({
// 	open,
// 	onOpenChange,
// }: {
// 	open: boolean;
// 	onOpenChange: (open: boolean) => void;
// }) {
// 	const { mutate, isPending } = useCreateThread();
// 	const { user } = useAuth();

// 	const form = useForm<InsertThread>({
// 		resolver: zodResolver(insertThreadSchema),
// 		defaultValues: {
// 			title: "",
// 			author: user?.username || "",
// 		},
// 	});

// 	function onSubmit(data: InsertThread) {
// 		mutate(data, {
// 			onSuccess: () => {
// 				form.reset();
// 				onOpenChange(false);
// 			},
// 		});
// 	}

// 	return (
// 		<Dialog open={open} onOpenChange={onOpenChange}>
// 			<DialogTrigger asChild>
// 				<Button className="shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
// 					<Plus className="mr-2 h-4 w-4" /> Start Discussion
// 				</Button>
// 			</DialogTrigger>
// 			<DialogContent className="sm:max-w-[500px]">
// 				<DialogHeader>
// 					<DialogTitle>Create New Thread</DialogTitle>
// 					<DialogDescription>
// 						Start a new discussion topic. Please follow community
// 						guidelines.
// 					</DialogDescription>
// 				</DialogHeader>
// 				<Form {...form}>
// 					<form
// 						onSubmit={form.handleSubmit(onSubmit)}
// 						className="space-y-4 pt-4"
// 					>
// 						<FormField
// 							control={form.control}
// 							name="title"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Topic Title</FormLabel>
// 									<FormControl>
// 										<Input
// 											placeholder="What would you like to discuss?"
// 											{...field}
// 										/>
// 									</FormControl>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>
// 						<FormField
// 							control={form.control}
// 							name="author"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Your Identity</FormLabel>
// 									<FormControl>
// 										<Input
// 											{...field}
// 											disabled
// 											value={user?.username || "Guest"}
// 											className="bg-muted font-mono"
// 										/>
// 									</FormControl>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>
// 						<div className="flex justify-end pt-4">
// 							<Button type="submit" disabled={isPending}>
// 								{isPending ? (
// 									<>
// 										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
// 										Creating...
// 									</>
// 								) : (
// 									"Create Thread"
// 								)}
// 							</Button>
// 						</div>
// 					</form>
// 				</Form>
// 			</DialogContent>
// 		</Dialog>
// 	);
// }
