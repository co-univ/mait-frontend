import clsx from "clsx";
import { FileUp } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import Lottie from "react-lottie";
import loadingAnimation from "@/assets/lotties/loading.json";

//
//
//

interface FileInputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	text?: string;
	className?: string;
	file: File | null;
	onChange: (file: File | null) => void;
	isLoading?: boolean;
}

//
//
//
const FileInput = ({
	text = "파일 업로드",
	className,
	file,
	onChange,
	isLoading = false,
	...props
}: FileInputProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [isDragging, setIsDragging] = useState(false);

	/**
	 *
	 */
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0] || null;
		onChange(selectedFile);
	};

	/**
	 *
	 */
	const handleDivClick = () => {
		if (!props.disabled && !isLoading && inputRef.current) {
			inputRef.current.click();
		}
	};

	/**
	 *
	 */
	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (
			(event.key === "Enter" || event.key === " ") &&
			!props.disabled &&
			!isLoading &&
			inputRef.current
		) {
			event.preventDefault();
			inputRef.current.click();
		}
	};

	/**
	 *
	 */
	const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();

		if (!props.disabled && !isLoading) {
			setIsDragging(true);
		}
	};

	/**
	 *
	 */
	const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();

		if (!event.currentTarget.contains(event.relatedTarget as Node)) {
			setIsDragging(false);
		}
	};

	/**
	 *
	 */
	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDragging(false);

		if (props.disabled || isLoading) {
			return;
		}

		const droppedFile = event.dataTransfer.files[0] || null;
		onChange(droppedFile);
	};

	/**
	 *
	 */
	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	return (
		<div
			className={clsx(
				"flex justify-center items-center gap-gap-5 w-full h-size-height-11 rounded-medium1 border border-color-gray-20 border-dashed bg-color-gray-5 cursor-pointer text-color-gray-40 typo-body-medium",
				{
					"!border-color-gray-10 text-color-gray-20 cursor-not-allowed":
						props.disabled || isLoading,
				},
				{
					"!border-solid border-color-primary-40 !text-color-gray-30":
						isDragging,
				},
				className,
			)}
			// biome-ignore lint/a11y/useSemanticElements: this div acts like a button with drag and drop functionality
			role="button"
			tabIndex={props.disabled || isLoading ? -1 : 0}
			onClick={handleDivClick}
			onKeyDown={handleKeyDown}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			onDragOver={handleDragOver}
		>
			<input
				ref={inputRef}
				type="file"
				onChange={handleFileChange}
				className="hidden"
				{...props}
			/>
			{isLoading ? (
				<Lottie
					options={{
						loop: true,
						autoplay: true,
						animationData: loadingAnimation,
					}}
				/>
			) : (
				<>
					<FileUp />
					<span className="">{text}</span>
				</>
			)}
		</div>
	);
};

export default FileInput;
