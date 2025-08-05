import type { JSX } from "react";
import SolvingQuizTitleBlankInput from "./SolvingQuizTitleBlankInput";

//
//
//

interface SolvingQuizTitleProps {
	title: string;
	type: "SHORT" | "MULTIPLE" | "ORDERING" | "FILL_BLANK";
	answers?: string[];
}

//
//
//

const SolvingQuizTitle = ({
	title,
	type,
	answers = [],
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

		const blankPattern = /___+/g;
		const parts = line.split(blankPattern);
		const blanks = line.match(blankPattern) || [];

		if (blanks.length === 0) {
			return line;
		}

		const result: (string | JSX.Element)[] = [];
		let blankIndex = 0;

		for (let i = 0; i < parts.length; i++) {
			if (parts[i]) {
				result.push(parts[i]);
			}

			if (i < blanks.length) {
				result.push(
					<SolvingQuizTitleBlankInput
						key={`${lineIndex}-${blankIndex}`}
						number={blankIndex + 1}
						value={answers[blankIndex] || ""}
						isActive={Boolean(answers[blankIndex])}
					/>,
				);
				blankIndex++;
			}
		}

		return result;
	};

	return (
		<div className="w-full">
			<span className="typo-heading-small">
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
