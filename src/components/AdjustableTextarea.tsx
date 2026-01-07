import clsx from "clsx";
import type React from "react";
import { useEffect, useRef } from "react";

//
//
//

export interface AdjustableTextareaProps
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

	//
	//
	//
	// biome-ignore lint/correctness/useExhaustiveDependencies: observer should only be set up once
	useEffect(() => {
		const textarea = ref.current;

		if (!textarea) {
			return;
		}

		adjustHeight();

		const resizeObserver = new ResizeObserver(() => {
			adjustHeight();
		});

		resizeObserver.observe(textarea);

		return () => {
			resizeObserver.disconnect();
		};
	}, [ref.current, props?.value, props?.defaultValue]);

	/**
	 *
	 */
	const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
		adjustHeight();
		props.onInput?.(e);
	};

	return (
		<textarea
			{...props}
			ref={ref}
			className={clsx(
				"resize-none overflow-hidden focus-visible:outline-none placeholder:text-color-gray-40 bg-inherit disabled:placeholder:text-color-gray-20",
				props.className,
			)}
			onInput={handleInput}
			rows={minRows}
		/>
	);
};

export default AdjustableTextarea;
