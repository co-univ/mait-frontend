import SolvingQuizTitleBlankInput from "./SolvingQuizTitleBlankInput";

//
//
//

interface SolvingQuizTitleProps {
	title: string;
	type?: "molu";
}

//
//
//

const SolvingQuizTitle = ({ title, type = "molu" }: SolvingQuizTitleProps) => {
	const lines = title.split("\n|\r");

	return (
		<div className="w-full">
			<span className="typo-heading-small">
				{lines.map((line, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: Using index as key is acceptable here since lines are static
					<span key={index}>
						{line}
						{index < lines.length - 1 && <br />}
					</span>
				))}
			</span>
		</div>
	);
};

export default SolvingQuizTitle;
