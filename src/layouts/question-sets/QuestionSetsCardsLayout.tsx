import type React from "react";

//
//
//

interface QuestionSetsCardsLayoutProps {
	minGridWidth?: number;
	children?: React.ReactNode;
}

//
//
//

const QuestionSetsCardsLayout = ({
	minGridWidth = 360,
	children,
}: QuestionSetsCardsLayoutProps) => {
	return (
		<section
			className="grid gap-gap-9"
			style={{
				gridTemplateColumns: `repeat(auto-fill, minmax(${minGridWidth}px, 1fr))`,
			}}
		>
			{children}
		</section>
	);
};

export default QuestionSetsCardsLayout;
