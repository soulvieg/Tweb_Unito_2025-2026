import React from "react";
import { useAuth } from "~/contexts/AuthContext";
import { errorCheck, is, validateRequired } from "~/lib/utils";
import Dialog from "./ui/Dialog";
import type { CreateNewsType, CreatePostType, NewsType } from "~/lib/types";
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
import CategorySelect, { CategoryField } from "./CategorySelect";

type DialogMode = "delete" | "update" | "create";

export default function NewsDialog({
	isOpen,
	onClose,
	mode,
	article,
}: {
	isOpen: boolean;
	onClose: () => void;
	mode: DialogMode;
	article?: NewsType;
}) {
	const { user } = useAuth();
	const { toast } = useToast();
	const navigate = useNavigate();

	const title: Record<DialogMode, string> = {
		delete: `Delete "${article?.title}"`,
		update: `Update "${article?.title}"`,
		create: "Create New Article",
	};

	const controls = useForm<CreateNewsType>({
		title: article?.title ?? "",
		content: article?.content ?? "",
		description: article?.description ?? "",
		img: article?.img ?? "",
		src: article?.src ?? "",
		location: article?.location ?? "",
		categoryId: article?.categoryId ?? 0,
	});

	const { mutate: update, isPending: isUpdating } = useMutation({
		...queries.news.update(article?.newsId!, controls.state),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queriesKeys.news.single(article?.newsId!),
			});
			queryClient.invalidateQueries({
				queryKey: queriesKeys.news.all,
			});
			onClose();
			toast.success({ message: "Article updated successfully" });
		},
		onError: (e: AxiosError) => {
			errorCheck(e, toast, "Couldn't update article");
		},
	});
	const { mutate: create, isPending: isCreating } = useMutation({
		...queries.news.create(controls.state),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queriesKeys.news.all });
			onClose();
			toast.success({ message: "Article created successfully" });
		},
		onError: (e: AxiosError) => {
			errorCheck(e, toast, "Couldn't create article");
		},
	});
	const { mutate: deleteArticle, isPending: isDeleting } = useMutation({
		...queries.news.delete(article?.newsId!),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queriesKeys.news.all });
			onClose();
			toast.success({
				message: `Article "${article?.title}" deleted`,
			});
			navigate("/news");
		},
		onError: (e: AxiosError) => {
			errorCheck(e, toast, "Couldn't delete article");
		},
	});

	const validate = (s: CreateNewsType) => {
		const errors: ErrorFormType<CreateNewsType> = {};
		validateRequired(s, errors, [
			"title",
			"content",
			"description",
			"location",
			"src",
			"img",
		]);
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
		delete: {
			isPending: isDeleting,
			mutate: deleteArticle,
			title: "Delete",
		},
		update: {
			isPending: isUpdating,
			mutate: () => {
				const errors = validate(controls.state);
				if (Object.keys(errors).length === 0 && user) update();
			},
			title: "Update",
		},
	};

	if (!is(user).admin) return null;
	return (
		<Dialog isOpen={isOpen} onClose={onClose} title={title[mode]}>
			{mode === "delete" ? (
				<div>
					are you sure you want to delete this post? This action
					cannot be undone.
				</div>
			) : (
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-4 justify-center w-full">
						{/* <div className="flex-1">
							<ImagePicker
								onImageSelect={(file) => {
									console.log(file);
								}}
							/>
						</div> */}
						<div className="flex-2">
							<FieldInput id="img" {...controls} label="Image" />
							<FieldInput
								id="title"
								{...controls}
								label="Article Title"
							/>

							<div className="flex gap-2">
								<FieldInput
									id="src"
									{...controls}
									label="Source"
								/>
								<FieldInput
									id="location"
									{...controls}
									label="Location"
								/>
								{mode == "create" ? (
									<CategoryField
										id="categoryId"
										label="Category"
										{...controls}
									/>
								) : null}
							</div>
							<FieldTextarea
								id="description"
								{...controls}
								label="Description"
								placeholder="Short description to introduce the topic"
								className="h-[60px]"
							/>
							<FieldTextarea
								id="content"
								{...controls}
								label="Content"
								placeholder="The core of the topic"
								className="h-[150px]"
							/>
						</div>
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
