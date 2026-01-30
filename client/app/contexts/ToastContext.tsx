import {
	AlertOctagon,
	AlertTriangle,
	BadgeCheck,
	BadgeInfo,
	X,
} from "lucide-react";
import {
	createContext,
	useContext,
	useState,
	type JSX,
	type ReactNode,
} from "react";
import { cn } from "~/lib/utils";

export type ToastType = "error" | "warning" | "success" | "info";

interface Toast {
	id: number;
	type: ToastType;
	title: JSX.Element | string;
	message: JSX.Element | string;
	duration: number;
}

interface CreateToast {
	type?: ToastType;
	title?: JSX.Element | string;
	message: JSX.Element | string;
	duration?: number;
}

export interface AddToast {
	info(newToast: CreateToast): void;
	error(newToast: CreateToast): void;
	warning(newToast: CreateToast): void;
	success(newToast: CreateToast): void;
}

interface ToastContextType {
	currentToasts: Toast[];
	toast: AddToast;
	removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType>({
	currentToasts: [],
	toast: {
		info: (newToast: CreateToast) => {},
		error: (newToast: CreateToast) => {},
		warning: (newToast: CreateToast) => {},
		success: (newToast: CreateToast) => {},
	},
	removeToast: (id: number) => {},
});

export function ToastProvider({ children }: { children: JSX.Element }) {
	const [toasts, setToasts] = useState<Toast[]>([]);
	const [curr, setCurr] = useState(0);
	const add = (newToast: CreateToast) => {
		const t = {
			id: curr,
			message: newToast.message,
			title: newToast.title ?? newToast.type?.toUpperCase() ?? "INFO",
			type: newToast.type ?? "info",
			duration: newToast.duration ?? 5000,
		};
		setToasts((prev) => [...prev, t]);
		setCurr((prev) => prev + 1);
		setTimeout(() => {
			removeToast(t.id);
		}, t.duration);
	};

	const removeToast = (id: number) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	};

	const toast = {
		info: (newToast: CreateToast) => add(newToast),
		error: (newToast: CreateToast) => add({ ...newToast, type: "error" }),
		warning: (newToast: CreateToast) =>
			add({ ...newToast, type: "warning" }),
		success: (newToast: CreateToast) =>
			add({ ...newToast, type: "success" }),
	};

	return (
		<ToastContext.Provider
			value={{ currentToasts: toasts, toast: toast, removeToast }}
		>
			{children}
			<ToastShower toasts={toasts} removeToast={removeToast} />
		</ToastContext.Provider>
	);
}

function ToastShower({
	toasts,
	removeToast,
}: {
	toasts: Toast[];
	removeToast: (id: number) => void;
}) {
	toasts.sort((a, b) => a.id - b.id);

	const boxClasses: Record<ToastType, string> = {
		info: "",
		error: "border-red-400 ",
		warning: "border-yellow-400",
		success: "border-green-400",
	};
	const titleClasses: Record<ToastType, string> = {
		info: "",
		error: "text-red-400 ",
		warning: "text-yellow-400",
		success: "text-green-400",
	};

	const icon: Record<ToastType, ReactNode> = {
		info: <BadgeInfo className="size-5" />,
		error: <AlertTriangle className="size-5" />,
		warning: <AlertOctagon className="size-5" />,
		success: <BadgeCheck className="size-5" />,
	};

	return (
		<div className="fixed z-999 bottom-5 right-5 flex gap-2 flex-col">
			{toasts.map((x, i) => (
				<div
					key={x.id}
					className={cn(
						" py-2 px-4  text-white animate-fade-in-up rounded-lg border border-gray-400   bg-accent-foreground",
						boxClasses[x.type],
					)}
				>
					<div className="relative h-full w-full text-slate-300">
						<div>
							<X
								className="size-4 absolute top-0 right-0 cursor-pointer"
								onClick={() => removeToast(x.id)}
							/>
						</div>
						<div className="pr-10">
							<div
								className={cn(
									" font-bold flex items-center gap-1",
									titleClasses[x.type],
								)}
							>
								{icon[x.type]}
								{x.title}
							</div>
							<div className="">{x.message}</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export const useToast = () => {
	const context = useContext(ToastContext);

	return context;
};
