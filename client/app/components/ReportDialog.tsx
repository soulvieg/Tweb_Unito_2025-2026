import React from "react";
import { useAuth } from "~/contexts/AuthContext";
import { errorCheck, is, validateRequired } from "~/lib/utils";
import Dialog from "./ui/Dialog";
import type {
	CommentType,
	CreateNewsType,
	CreatePostType,
	CreateReportType,
	NewsType,
} from "~/lib/types";
import { ImagePicker } from "./ui/Input";
import useForm, { type ErrorFormType } from "~/hooks/useForm";
import { format } from "date-fns";
import { FieldInput, FieldTextarea } from "./ui/Field";
import { useMutation } from "@tanstack/react-query";
import { queries } from "~/lib/Api/api";
import { queryClient } from "~/layouts/MainLayout";
import { useToast } from "~/contexts/ToastContext";
import Button, { MutateButton } from "./ui/Button";
import { useNavigate } from "react-router";
import { queriesKeys } from "~/lib/Api/queriesKeys";
import type { AxiosError } from "axios";

type DialogMode = "create";

export default function ReportDialog({
	isOpen,
	onClose,
	mode,
	comment,
}: {
	isOpen: boolean;
	onClose: () => void;
	mode: DialogMode;
	comment: CommentType | undefined;
}) {
	const { user } = useAuth();
	const { toast } = useToast();
	const navigate = useNavigate();

	const controls = useForm<CreateReportType>({
		reason: "",
		reporterId: user?.userId || -1,
		commentId: comment?.commentId || -1,
	});

	const { mutate: create, isPending: isCreating } = useMutation({
		...queries.reports.create(controls.state),
		onSuccess: () => {
			onClose();
			toast.success({ message: "This comment was reported" });
		},
		onError: (e: AxiosError) => {
			errorCheck(e, toast, "Couldn't report this comment");
		},
	});

	const validate = (s: CreateReportType) => {
		const errors: ErrorFormType<CreateReportType> = {};
		validateRequired(s, errors, ["reason"]);
		controls.setErrors(errors);
		return errors;
	};

	const action = {
		create: {
			isPending: isCreating,
			mutate: () => {
				const errors = validate(controls.state);
				if (Object.keys(errors).length === 0 && user) create();
			},
			title: "Create",
		},
	};

	if (!user) return null;
	return (
		<Dialog isOpen={isOpen} onClose={onClose} title={"Report Comment"}>
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-4 justify-center w-full">
					<div className="flex-2">
						<FieldTextarea
							id="reason"
							{...controls}
							label="Reason"
							placeholder="Short description to introduce the topic"
							className="h-[60px]"
						/>
					</div>
				</div>
			</div>

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
