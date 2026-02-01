import React, { type InputHTMLAttributes } from "react";
import { cn } from "~/lib/utils";
import { useState, useRef, useEffect } from "react";
import { Image, X } from "lucide-react";
import Button from "./Button";

export const common =
	"rounded-lg border border-gray-400 py-1 px-2 bg-muted font-mono";

export type InputProps = {
	label?: string;
} & InputHTMLAttributes<HTMLInputElement>;
export function Input({ label, ...rest }: InputProps) {
	return (
		<div className="flex flex-col gap-1">
			{label ? <label htmlFor={rest.id}>{label}</label> : null}
			<input {...rest} className={cn(common, rest.className ?? "")} />
		</div>
	);
}

export type TextareaProps = {
	label?: string;
} & InputHTMLAttributes<HTMLTextAreaElement>;
export function Textarea({ label, ...rest }: TextareaProps) {
	return (
		<div className="flex flex-col gap-1">
			{label ? <label htmlFor={rest.id}>{label}</label> : null}
			<textarea {...rest} className={cn(common, rest.className ?? "")} />
		</div>
	);
}

export type SelectProps = {
	label?: string;
	options?: { value: number; label: string }[];
} & InputHTMLAttributes<HTMLSelectElement>;
export function Select({ label, options, ...rest }: SelectProps) {
	return (
		<div className="flex flex-col gap-1">
			{label ? <label htmlFor={rest.id}>{label}</label> : null}
			<select {...rest} className={cn(common, rest.className ?? "")}>
				{options?.map((x) => (
					<option key={rest.name + "_" + x.value} value={x.value}>
						{x.label}
					</option>
				))}
			</select>
		</div>
	);
}

interface ImagePickerProps {
	onImageSelect: (file: File) => void;
}

export function ImagePicker({ onImageSelect }: ImagePickerProps) {
	const [preview, setPreview] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [dragOn, setDragOn] = useState(false);
	const [hover, setHover] = useState(false);

	// 1. Handle File Selection
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			processFile(file);
		}
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const file = event.dataTransfer.files?.[0];
		if (file && file.type.startsWith("image/")) {
			processFile(file);
		}
	};

	const processFile = (file: File) => {
		const objectUrl = URL.createObjectURL(file);
		setPreview(objectUrl);
		onImageSelect(file); // Send to parent
	};

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	useEffect(() => {
		return () => {
			if (preview) {
				URL.revokeObjectURL(preview);
			}
		};
	}, [preview]);

	return (
		<div
			onClick={handleClick}
			onDrop={handleDrop}
			onDragOver={(e) => {
				e.preventDefault();
			}}
			onDragEnter={(e) => {
				e.preventDefault();
				setDragOn(true);
			}}
			onDragLeave={(e) => {
				e.preventDefault();
				setDragOn(false);
			}}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			className={cn(
				"relative border border-dashed rounded-lg p-5 text-center cursor-pointer flex flex-col items-center justify-center min-h-[200px] bg-accent-foreground",
				dragOn && !preview ? "border-secondary" : "border-muted",
			)}
		>
			<input
				type="file"
				accept="image/*"
				ref={fileInputRef}
				onChange={handleFileChange}
				className="hidden"
			/>

			{preview ? (
				<Button
					variant="outline"
					size="icon"
					onClick={(e) => {
						e.stopPropagation();
						setPreview(null);
						setDragOn(false);
					}}
					className={cn(
						"absolute p-1 right-5 bottom-5",
						hover
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-5",
					)}
				>
					<X />
				</Button>
			) : null}

			{preview ? (
				<img
					src={preview}
					alt="Preview"
					className="max-w-full max-h-[200px] rounded-lg"
				/>
			) : (
				<div className="text-[#666] flex flex-col items-center justify-center pointer-events-none">
					<p
						className={cn(
							"transition-all ",
							dragOn && !preview
								? "translate-y-15 text-2xl"
								: "translate-y-0 text-base",
						)}
					>
						Click or Drag image here
					</p>
					<Image
						className={cn(
							"transition-all ",
							dragOn && !preview
								? "scale-200 rotate-15 -translate-y-5"
								: "scale-100 rotate-0 translate-y-0",
						)}
					/>
				</div>
			)}
		</div>
	);
}
