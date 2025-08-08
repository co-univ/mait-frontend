import clsx from "clsx";
import type React from "react";
import { useEffect, useRef, useState } from "react";

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
	const [isInitialized, setIsInitialized] = useState(false);

	/**
	 * 커서를 텍스트 끝으로 이동시키는 함수
	 */
	const moveCursorToEnd = () => {
		if (!paragraphRef.current) return;

		const element = paragraphRef.current;
		const range = document.createRange();
		const selection = window.getSelection();

		if (element.childNodes.length > 0) {
			const lastNode = element.childNodes[element.childNodes.length - 1];
			const offset =
				lastNode.nodeType === Node.TEXT_NODE
					? lastNode.textContent?.length || 0
					: 0;
			range.setStart(lastNode, offset);
		} else {
			range.setStart(element, 0);
		}

		range.collapse(true);
		selection?.removeAllRanges();
		selection?.addRange(range);
	};

	/**
	 * input 이벤트 처리 - 타이핑 시 실행
	 */
	const handleInput = (e: React.FormEvent<HTMLParagraphElement>) => {
		const text = e.currentTarget.textContent || "";
		onChange?.(text);

		// 타이핑 후 커서를 끝으로 이동
		setTimeout(moveCursorToEnd, 0);
	};

	/**
	 * 붙여넣기 이벤트 처리 - 스타일 제거하고 순수 텍스트만 삽입
	 */
	const handlePaste = (e: React.ClipboardEvent<HTMLParagraphElement>) => {
		e.preventDefault();

		// 클립보드에서 순수 텍스트만 가져오기
		const text = e.clipboardData.getData("text/plain");

		if (!text) return;

		// 현재 selection 위치에 텍스트 삽입
		const selection = window.getSelection();
		if (selection && selection.rangeCount > 0) {
			const range = selection.getRangeAt(0);
			range.deleteContents();

			// 순수 텍스트 노드 생성하여 삽입
			const textNode = document.createTextNode(text);
			range.insertNode(textNode);
		} else {
			// selection이 없는 경우 기존 내용을 완전히 교체
			if (paragraphRef.current) {
				paragraphRef.current.textContent = text;
			}
		}

		// 변경된 내용을 상위 컴포넌트에 알리고 커서를 끝으로 이동
		const newText = paragraphRef.current?.textContent || "";
		onChange?.(newText);
		setTimeout(moveCursorToEnd, 0);
	};

	/**
	 * 컴포넌트 마운트 시 초기값 설정
	 */
	useEffect(() => {
		if (paragraphRef.current && !isInitialized) {
			paragraphRef.current.textContent = value;
			setIsInitialized(true);
		}
	}, [value, isInitialized]);

	/**
	 * 외부에서 value가 변경될 때만 동기화
	 * (사용자 입력이 아닌 외부 상태 변경 시)
	 */
	useEffect(() => {
		if (paragraphRef.current && isInitialized) {
			const currentText = paragraphRef.current.textContent || "";
			if (currentText !== value) {
				paragraphRef.current.textContent = value;
				setTimeout(moveCursorToEnd, 0);
			}
		}
	}, [value, isInitialized]);

	return (
		<div
			className={clsx(
				"flex items-center w-full px-padding-12 py-padding-6 rounded-medium1 border box-border",
				{
					"bg-gray-5 border-gray-5 text-alpha-black100 typo-body-medium":
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
