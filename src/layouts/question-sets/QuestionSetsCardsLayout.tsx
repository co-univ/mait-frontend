import { Children } from "react";
import EmptyQuestion from "@/components/EmptyQuestion";

//
//
//

interface QuestionSetsCardsLayoutProps {
	isLoading?: boolean;
	minGridWidth?: number;
	children?: React.ReactNode;
}

//
//
//

const QuestionSetsCardsLayout = ({
	isLoading = false,
	minGridWidth = 360,
	children,
}: QuestionSetsCardsLayoutProps) => {
	if (isLoading) {
		return null;
	}

	if (!children || Children.count(children) === 0) {
		return <EmptyQuestion />;
	}

	return (
		<div
			className="grid gap-gap-9"
			style={{
				gridTemplateColumns: `repeat(auto-fill, minmax(${minGridWidth}px, 1fr))`,
			}}
		>
			{children}
		</div>
	);
};

export default QuestionSetsCardsLayout;
