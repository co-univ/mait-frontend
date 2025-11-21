import type { JSX } from "react";
import { FILL_BLANK_PATTERN } from "@/app.constants";
import SolvingQuizTitleBlankInput from "./SolvingQuizTitleBlankInput";

//
//
//

interface SolvingQuizTitleProps {
	title: string;
	type: "SHORT" | "MULTIPLE" | "ORDERING" | "FILL_BLANK";
	questionInfo?: any;
	userAnswers?: any;
}

//
//
//

const SolvingQuizTitle = ({
	title,
	type,
	questionInfo,
	userAnswers,
}: SolvingQuizTitleProps) => {
	const lines = title.split("\n|\r");

	/**
	 *
	 * @param line
	 * @param lineIndex
	 * @returns
	 */
	const renderLineWithBlanks = (line: string, lineIndex: number) => {
		if (type !== "FILL_BLANK") {
			return line;
		}

		const parts: (string | JSX.Element)[] = [];
		let lastIndex = 0;

		// Reset the regex lastIndex
		const pattern = new RegExp(FILL_BLANK_PATTERN.source, FILL_BLANK_PATTERN.flags);

		let match = pattern.exec(line);
		while (match !== null) {
			// Add text before the match
			if (match.index > lastIndex) {
				parts.push(line.slice(lastIndex, match.index));
			}

			// Add the blank input
			const blankNumber = Number.parseInt(match[1], 10);
			parts.push(
				<SolvingQuizTitleBlankInput
					key={`${lineIndex}-${blankNumber}`}
					number={blankNumber}
					index={blankNumber - 1}
					questionInfo={questionInfo}
					userAnswers={userAnswers}
				/>,
			);

			lastIndex = pattern.lastIndex;
			match = pattern.exec(line);
		}

		// Add remaining text
		if (lastIndex < line.length) {
			parts.push(line.slice(lastIndex));
		}

		return parts.length > 0 ? parts : line;
	};

	return (
		<div className="w-full">
			<span className="typo-heading-small text-alpha-black100">
				{lines.map((line, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: Using index as key is acceptable here since lines are static
					<span key={index}>
						{renderLineWithBlanks(line, index)}
						{index < lines.length - 1 && <br />}
					</span>
				))}
			</span>
		</div>
	);
};

export default SolvingQuizTitle;
