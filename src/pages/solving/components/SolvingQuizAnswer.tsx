import clsx from "clsx";
import type React from "react";
import { useEffect, useRef } from "react";

//
//
//

export const ANSWER_HEIGHT = 94;

export interface SolvingQuizAnswerProps {
	readonly?: boolean;
	draggable?: boolean;
	color?: "gray" | "primary" | "success" | "point";
	value?: string;
	placeholder?: string;
	className?: string;
	onChange?: (value: string) => void;
	style?: React.CSSProperties;
}

//
//
//

const SolvingQuizAnswer = ({
	readonly = true,
	draggable = false,
	color = "gray",
	value = "",
	placeholder = "",
	className = "",
	onChange,
	style = {},
}: SolvingQuizAnswerProps) => {
	const paragraphRef = useRef<HTMLParagraphElement>(null);

	/**
	 * Returns the cursor style based on the readonly and draggable props.
	 */
	const cursorStyle = () => {
		if (draggable) {
			return "cursor-grab";
		}

		if (readonly) {
			return "cursor-default";
		}

		return "cursor-text";
	};

	/**
	 *
	 */
	const handleInput = (e: React.FormEvent<HTMLParagraphElement>) => {
		const text = e.currentTarget.textContent || "";
		onChange?.(text);
	};

	/**
	 * Handles paste events to insert text at the cursor position.
	 * This allows for pasting text directly into the contentEditable element.
	 */
	const handlePaste = (e: React.ClipboardEvent<HTMLParagraphElement>) => {
		e.preventDefault();

		const text = e.clipboardData.getData("text/plain");
		const selection = window.getSelection();

		if (selection && selection.rangeCount > 0) {
			const range = selection.getRangeAt(0);
			range.deleteContents();

			const textNode = document.createTextNode(text);
			range.insertNode(textNode);

			// Move the cursor to the end of the inserted text
			range.setStartAfter(textNode);
			range.setEndAfter(textNode);
			range.collapse(false);

			selection.removeAllRanges();
			selection.addRange(range);

			// Keep focus
			e.currentTarget.focus();
		}
	};

	// Set the initial value of the paragraph element
	useEffect(() => {
		if (paragraphRef.current) {
			if (value !== "") {
				paragraphRef.current.textContent = value;
			} else {
				paragraphRef.current.textContent = "";
			}
		}
	}, [value]);

	return (
		<div
			className={clsx(
				"flex items-center w-full px-padding-12 py-padding-6 rounded-medium1 border",
				{
					"bg-gray-5 border-transparent text-alpha-black100 typo-body-medium":
						color === "gray",
					"bg-primary-5 border-primary-50 text-primary-50 typo-heading-small":
						color === "primary",
					"bg-success-5 border-success-50 text-success-50 typo-heading-small":
						color === "success",
					"bg-point-5 border-point-50 text-point-50 typo-heading-small":
						color === "point",
				},
			)}
			style={{
				height: ANSWER_HEIGHT,
			}}
		>
			<p
				ref={paragraphRef}
				suppressContentEditableWarning
				contentEditable={!readonly}
				onInput={readonly ? undefined : handleInput}
				onPaste={readonly ? undefined : handlePaste}
				className={clsx(
					"w-full outline-none bg-transparent break-words whitespace-pre-wrap overflow-y-auto",
					"empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:pointer-events-none",
					{
						"cursor-grab": draggable,
						"cursor-text": !readonly,
						"cursor-default": readonly,
					},
					className,
				)}
				style={{
					maxHeight: ANSWER_HEIGHT - 20,
					...style,
				}}
				data-placeholder={placeholder}
			/>
		</div>
	);
};

export default SolvingQuizAnswer;
