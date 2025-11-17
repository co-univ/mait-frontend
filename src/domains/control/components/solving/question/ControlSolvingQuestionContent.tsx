import type { JSX } from "react";
import { FILL_BLANK_PATTERN } from "@/app.constants";
import FillBlank from "@/components/FillBlank";

interface ControlSolvingQuestionContentProps {
	content?: string;
	imgUrl?: string;
}

//
//
//

const ControlSolvingQuestionContent = ({
	content,
	imgUrl,
}: ControlSolvingQuestionContentProps) => {
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

		for (const match of matches) {
			if (match.index !== undefined && match.index > lastIndex) {
				parts.push(content.slice(lastIndex, match.index));
			}

			const number = Number.parseInt(match[1], 10);
			parts.push(<FillBlank key={`blank-${match.index}`} number={number} />);

			lastIndex = (match.index ?? 0) + match[0].length;
		}

		if (lastIndex < content.length) {
			parts.push(content.slice(lastIndex));
		}

		return parts;
	};

	return (
		<div className="flex flex-col gap-gap-9">
			<div className="w-full min-h-[63.5px] py-padding-9 px-padding-12 border border-color-gray-40 rounded-radius-medium1 typo-body-medium">
				{renderContent()}
			</div>

			{imgUrl && (
				<div className="w-full max-h-[200px] flex items-center justify-center">
					<img
						src={imgUrl}
						alt="Question-image"
						className="max-w-full max-h-[200px] h-auto w-auto object-contain rounded-radius-medium1"
					/>
				</div>
			)}
		</div>
	);
};

export default ControlSolvingQuestionContent;
