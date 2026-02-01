import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "~/layouts/MainLayout";
import { queries } from "~/lib/Api/api";
import Skeleton from "./ui/Skeleton";
import { common, type SelectProps } from "./ui/Input";
import { FieldSelect } from "./ui/Field";
import type { UseFormReturn } from "~/hooks/useForm";
import { queriesKeys } from "~/lib/Api/queriesKeys";
import { useToast } from "~/contexts/ToastContext";
import type { AxiosError } from "axios";
import { cn, errorCheck } from "~/lib/utils";
import type { NewsType } from "~/lib/types";

export default function CategorySelect<T extends Record<string, any>>({
	news,
	...rest
}: { news: NewsType } & SelectProps) {
	// const [value, setValue]
	const { toast } = useToast();
	const { data: categories, isPending } = useQuery(
		queries.categories.getAll(),
		queryClient,
	);

	const { mutate: changeCategory, isPending: isUpdating } = useMutation({
		...queries.news.changeCategory(news.newsId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queriesKeys.news.single(news.newsId),
			});
			queryClient.invalidateQueries({
				queryKey: queriesKeys.news.all,
			});
			toast.success({ message: "Article updated successfully" });
		},
		onError: (e: AxiosError) => {
			errorCheck(e, toast, "Couldn't change category of article");
		},
	});

	if (isPending)
		return <Skeleton className="w-max rounded-xl min-w-[100px] h-10" />;
	if (!categories || categories.length === 0)
		return <div className="w-max h-5">No categories found</div>;

	return (
		<select
			disabled={isUpdating}
			value={news.categoryId ?? 0}
			onChange={(v) => {
				changeCategory(parseInt(v.target.value));
			}}
			{...rest}
			className={cn("w-min", rest.className ?? "")}
		>
			{categories
				?.map((x) => ({
					value: x.categoryId,
					label: x.categoryName,
				}))
				?.map((x) => (
					<option key={rest.name + "_" + x.value} value={x.value}>
						{x.label}
					</option>
				))}
		</select>
	);
}

export function CategoryField<T extends Record<string, any>>({
	...rest
}: Omit<SelectProps, "id" | "options"> &
	UseFormReturn<T> & {
		id: keyof T;
	}) {
	const { data: categories, isPending } = useQuery(
		queries.categories.getAll(),
		queryClient,
	);

	if (isPending)
		return <Skeleton className="w-max rounded-xl min-w-[100px] h-10" />;
	if (!categories || categories.length === 0)
		return <div className="w-max h-5">No categories found</div>;

	return (
		<FieldSelect
			{...rest}
			options={categories?.map((x) => ({
				value: x.categoryId,
				label: x.categoryName,
			}))}
		/>
	);
}
