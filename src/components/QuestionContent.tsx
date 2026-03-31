import clsx from "clsx";
import type { JSX } from "react";
import { FILL_BLANK_PATTERN } from "@/app.constants";
import useBreakpoint from "@/hooks/useBreakpoint";
import FillBlank from "./FillBlank";

//
//
//

interface QuestionContentProps {
	content?: string;
	className?: string;
}

//
//
//

const QuestionContent = ({ content, className }: QuestionContentProps) => {
	const { isMobile } = useBreakpoint();

	/**
	 *
	 */
	const renderContent = () => {
		if (!content) {
			return null;
		}

		const parts: (string | JSX.Element)[] = [];
		let lastIndex = 0;

		const matches = Array.from(content.matchAll(FILL_BLANK_PATTERN));

		let brCount = 0;
		const pushText = (text: string) => {
			const lines = text.split("\n");
			lines.forEach((line, i) => {
				if (i > 0) {
					parts.push(<br key={`br-${brCount++}`} />);
				}
				if (line) {
					parts.push(line);
				}
			});
		};

		for (const match of matches) {
			if (match.index !== undefined && match.index > lastIndex) {
				pushText(content.slice(lastIndex, match.index));
			}

			const number = Number.parseInt(match[1], 10);
			parts.push(<FillBlank key={`blank-${match.index}`} number={number} />);

			lastIndex = (match.index ?? 0) + match[0].length;
		}

		if (lastIndex < content.length) {
			pushText(content.slice(lastIndex));
		}

		return parts;
	};

	return (
		<div
			className={clsx(
				{
					"typo-heading-small": !isMobile,
					"typo-heading-xxsmall": isMobile,
				},
				className,
			)}
		>
			{renderContent()}
		</div>
	);
};

export default QuestionContent;
