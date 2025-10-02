import clsx from "clsx";
import type React from "react";
import { useEffect, useRef } from "react";

//
//
//

interface AdjustableTextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	minRows?: number;
	maxRows?: number;
}

//
//
//

const AdjustableTextarea = ({
	minRows = 1,
	maxRows,
	...props
}: AdjustableTextareaProps) => {
	const ref = useRef<HTMLTextAreaElement>(null);

	/**
	 * Adjusts the height of the textarea to fit its content.
	 */
	const adjustHeight = () => {
		const textarea = ref.current;

		if (!textarea) {
			return;
		}

		textarea.style.height = "auto";

		const scrollHeight = textarea.scrollHeight;
		const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 20;

		const minHeight = minRows * lineHeight;
		const maxHeight = maxRows ? maxRows * lineHeight : Infinity;

		const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
		textarea.style.height = `${newHeight}px`;
	};

	/**
	 *
	 */
	const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
		adjustHeight();
		props.onInput?.(e);
	};

	//
	//
	// biome-ignore lint/correctness/useExhaustiveDependencies: textarea height should be adjusted only when value changes
	useEffect(() => {
		adjustHeight();
	}, [props.value]);

	return (
		<textarea
			{...props}
			ref={ref}
			className={clsx(
				"resize-none overflow-hidden focus-visible:outline-none placeholder:text-color-gray-40 bg-inherit",
				props.className,
			)}
			onInput={handleInput}
			rows={minRows}
		/>
	);
};

export default AdjustableTextarea;
