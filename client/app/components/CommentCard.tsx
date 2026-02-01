import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useAuth } from "~/contexts/AuthContext";
import { useToast } from "~/contexts/ToastContext";
import { queryClient } from "~/layouts/MainLayout";
import { queries } from "~/lib/Api/api";
import type { CommentType } from "~/lib/types";
import Tooltip from "./ui/Tooltip";
import { cn, errorCheck, is } from "~/lib/utils";
import Button, { MutateButton } from "./ui/Button";
import {
	Crown,
	MessageCircleWarning,
	User,
	Volume2,
	VolumeOff,
} from "lucide-react";
import Skeleton from "./ui/Skeleton";
import { Card } from "./ui/Card";
import { type Dispatch, type SetStateAction } from "react";
import type { AxiosError } from "axios";
import { queriesKeys } from "~/lib/Api/queriesKeys";

export function CommentCard({
	comment,
	onReport,
}: {
	comment: CommentType;
	onReport: (comment: CommentType) => void;
}) {
	const { toast } = useToast();
	const { data: author, isPending: isAuthorLoading } = useQuery(
		{
			queryKey: ["comment", "author", comment.userId],
			queryFn: queries.users.getOne(comment.userId).queryFn,
		},
		queryClient,
	);

	const { user } = useAuth();
	const { mutate: toggleMute, isPending: isTogglingMute } = useMutation({
		...queries.comments.mute(comment.commentId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queriesKeys.comments.all,
			});
			toast.success({
				message: `The comment was ${!comment.muted ? "muted" : "unmuted"}`,
			});
		},
		onError: (e: AxiosError) => {
			errorCheck(e, toast, "You couldn't mute this comment");
		},
	}); //useMutation(queries.comments.mute);

	const myComment = user?.userId === comment.userId;

	const userBadge = (
		<div className="shrink-0">
			<div className="flex items-center gap-2">
				<div className="h-6 w-6 rounded-full bg-gray-500 p-5 border-gray-300 border flex items-center justify-center text-white text-sm font-semibold">
					{author?.username.slice(0, 2).toUpperCase() || <User />}
				</div>
			</div>
		</div>
	);

	const date = (
		<div className="flex items-center justify-between gap-2">
			<span className="text-xs text-muted-foreground">
				{format(new Date(comment.timestamp), "MMM d, h:mm a")}
			</span>
		</div>
	);

	const actions = (
		<>
			{is(user).admin ? (
				<Tooltip tooltip={comment.muted ? "Unmute" : "Mute"}>
					<MutateButton
						noStyle
						onClick={() => {
							toggleMute();
						}}
						isPending={isTogglingMute}
						className="cursor-pointer "
					>
						{!comment.muted ? (
							<Volume2 className="size-4 mt-1" />
						) : (
							<VolumeOff className="size-4 mt-1" />
						)}
					</MutateButton>
				</Tooltip>
			) : user ? (
				<div>
					<Tooltip tooltip="Report">
						<Button
							onClick={() => {
								onReport(comment);
							}}
							noStyle
							className="cursor-pointer "
						>
							<MessageCircleWarning className="size-4 cursor-pointer" />
						</Button>
					</Tooltip>
				</div>
			) : null}
		</>
	);

	const role = (
		<>
			{isAuthorLoading ? (
				<Skeleton className="h-3 w-15" />
			) : (
				<div className="flex items-center justify-center gap-2">
					{author?.role == "admin" ? (
						<Tooltip tooltip="This user is an admin">
							<Crown className="size-4 text-amber-400" />
						</Tooltip>
					) : null}
					{author?.username ?? "Unknown User"}
				</div>
			)}
		</>
	);

	const bar = (
		<div className="grow space-y-2">
			{myComment ? (
				<div className={cn("flex justify-end")}>
					<span className="font-medium text-foreground flex gap-6 items-center justify-center">
						{actions}
						{date}
						{role}
					</span>
				</div>
			) : (
				<div className={cn("flex")}>
					<span className="font-medium text-foreground flex gap-6 items-center justify-center">
						{role}
						{date}
						{actions}
					</span>
				</div>
			)}
			<div
				className={cn(
					"text-sm  leading-relaxed w-fit p-4 bg-card border  shadow-sm",
					myComment
						? "justify-self-end rounded-l-xl rounded-br-xl"
						: "rounded-r-xl rounded-bl-xl",
				)}
			>
				{comment.muted
					? "This comment was muted by an admin"
					: comment.text}
			</div>
		</div>
	);

	return (
		<Card
			className={cn(
				" border-none shadow-none bg-transparent",
				comment.muted ? "text-gray-500" : "",
			)}
		>
			<div className="flex gap-4">
				{myComment ? (
					<>
						{bar}
						{userBadge}
					</>
				) : (
					<>
						{userBadge}
						{bar}
					</>
				)}
			</div>
		</Card>
	);
}
