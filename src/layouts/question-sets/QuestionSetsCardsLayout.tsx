import type React from "react";
import chartClipImage from "@/assets/images/chart-clip.png";

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
	/**
	 *
	 */
	const renderEmptyState = () => {
		return (
			<div className="h-full flex flex-col justify-center items-center gap-gap-5">
				<img src={chartClipImage} alt="empty state" className="size-[100px]" />
				<span className="text-color-gray-30 typo-body-medium">
					원하는 문제를 생성해볼래요?
				</span>
			</div>
		);
	};

	if (isLoading) {
		return null;
	}

	if (!children) {
		return renderEmptyState();
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
