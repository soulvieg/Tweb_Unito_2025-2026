import { useMutation } from "@tanstack/react-query";
import { useAuth } from "~/contexts/AuthContext";
import { useToast } from "~/contexts/ToastContext";
import { queryClient } from "~/layouts/MainLayout";
import { queries } from "~/lib/Api/api";
import { MutateButton } from "./ui/Button";
import type { CreateCommentType } from "~/lib/types";
import useForm, { type ErrorFormType } from "~/hooks/useForm";
import { errorCheck, validateRequired } from "~/lib/utils";
import { FieldTextarea } from "./ui/Field";
import type { AxiosError } from "axios";
import { queriesKeys } from "~/lib/Api/queriesKeys";

export function ReplyForm({ postId: postId }: { postId: number }) {
	const { user } = useAuth();
	const { toast } = useToast();

	const controls = useForm<CreateCommentType>({
		postId: postId,
		author: user?.userId ?? -1,
		text: "",
	});

	const validate = (s: CreateCommentType) => {
		const errors: ErrorFormType<CreateCommentType> = {};
		validateRequired(s, errors, ["text"]);
		controls.setErrors(errors);
		return errors;
	};

	const { mutate: create, isPending } = useMutation({
		...queries.comments.create(controls.state),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: queriesKeys.comments.all,
			});
			toast.success({
				title: "Success",
				message: `The comment "${data.text}" was created`,
			});
			controls.reset();
		},
		onError: (e: AxiosError) => {
			errorCheck(e, toast,  "You couldn't comment on this post");
		},
		
	});

	return (
		<>
			<div className="space-y-4">
				<FieldTextarea
					label="Comment"
					id="text"
					{...controls}
					placeholder="Share your thoughts respectfully..."
					className="min-h-[120px] bg-background resize-y"
				/>

				<div className="flex justify-end">
					<MutateButton
						type="button"
						onClick={() => {
							const errors = validate(controls.state);
							if (Object.keys(errors).length === 0) create();
						}}
						isPending={isPending}
					>
						Reply
					</MutateButton>
				</div>
			</div>
		</>
	);
}
