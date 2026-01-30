import { useAuth } from "~/contexts/AuthContext";
import { errorCheck, is, validateRequired } from "~/lib/utils";
import Dialog from "./ui/Dialog";
import type {
	CreateNewsType,
	CreatePostType,
	NewsType,
	PostType,
} from "~/lib/types";
import useForm, { type ErrorFormType } from "~/hooks/useForm";
import { FieldInput, FieldTextarea } from "./ui/Field";
import { useMutation } from "@tanstack/react-query";
import { queries } from "~/lib/Api/api";
import { queryClient } from "~/layouts/MainLayout";
import { useToast } from "~/contexts/ToastContext";
import Button, { MutateButton } from "./ui/Button";
import { useLocation, useNavigate } from "react-router";
import { queriesKeys } from "~/lib/Api/queriesKeys";
import type { AxiosError } from "axios";

type DialogMode = "delete" | "create";

export default function ForumDialog({
	isOpen,
	onClose,
	mode,
	post,
}: {
	isOpen: boolean;
	onClose: () => void;
	mode: DialogMode;
	post?: PostType;
}) {
	const { user } = useAuth();
	const { toast } = useToast();
	const navigate = useNavigate();
	const location = useLocation();

	const title: Record<DialogMode, string> = {
		delete: `Delete "${post?.title}"`,
		create: `Create a New Discussion`,
	};

	const controls = useForm<CreatePostType>({
		title: "",
		text: "",
		author: user?.userId || -1,
	});

	const validate = (s: CreatePostType) => {
		const errors: ErrorFormType<CreatePostType> = {};
		validateRequired(s, errors, ["title", "text"]);
		controls.setErrors(errors);
		return errors;
	};

	const { mutate: create, isPending: isCreating } = useMutation({
		...queries.posts.create(controls.state),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: queriesKeys.posts.all });
			onClose();
			toast.success({
				message: `You started a new discussion about "${data.title}"`,
			});
		},
		onError: (e: AxiosError) => {
			errorCheck(e, toast, `failed to start a discussion: ${e.message}`);
		},
	});
	const { mutate: deleteArticle, isPending: isDeleting } = useMutation({
		...queries.posts.delete(post?.postId!),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queriesKeys.posts.all });
			onClose();
			toast.success({
				message: `You deleted the post "${post?.title}"`,
			});
			if (location.pathname !== "/forum") navigate("/forum");
		},
		onError: (e: AxiosError) => {
			errorCheck(
				e,
				toast,
				<div>
					<div>Couldn't delete the post!</div>
					<div>{e.message}</div>
				</div>,
			);
		},
	});

	const action = {
		create: {
			isPending: isCreating,
			mutate: () => {
				const errors = validate(controls.state);
				if (Object.keys(errors).length === 0 && user) create();
			},
			title: "Create",
		},
		delete: {
			isPending: isDeleting,
			mutate: deleteArticle,
			title: "Delete",
		},
	};

	if (!is(user).admin && mode === "delete") return null;
	return (
		<Dialog isOpen={isOpen} onClose={onClose} title={title[mode]}>
			{mode === "delete" ? (
				<div>
					are you sure you want to delete this post? This action
					cannot be undone.
				</div>
			) : (
				<div className="flex gap-2 flex-col ">
					<div className="space-y-4 pt-4">
						<FieldInput
							id="title"
							{...controls}
							label="Topic Title"
							placeholder="What would you like to discuss?"
						/>
						<FieldTextarea
							id="text"
							{...controls}
							label="Discussion"
							placeholder="Start the discussion"
							className="bg-muted font-mono rounded-xl border border-gray-400 py-2 px-3 w-full h-32 resize-none"
						/>
					</div>
				</div>
			)}
			<div className="flex justify-end mt-5">
				<div className="flex gap-2">
					<MutateButton
						isPending={action[mode].isPending}
						onClick={() => action[mode].mutate()}
					>
						{action[mode].title}
					</MutateButton>
					<Button variant="secondary" onClick={onClose}>
						Cancel
					</Button>
				</div>
			</div>
		</Dialog>
	);
}
