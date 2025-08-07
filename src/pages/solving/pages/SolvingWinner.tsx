import type React from "react";
import SolvingFullModalLayout from "../layouts/SolvingFullModalLayout";

interface SolvingWinnerProps {
	open?: boolean;
	onClose?: () => void;
	children?: React.ReactNode;
}

const SolvingWinner = ({ open, onClose, children }: SolvingWinnerProps) => {
	return (
		<SolvingFullModalLayout
			open={open}
			onClose={onClose}
			contentClassName="bg-gradient-to-b from-yellow-50 to-amber-100"
		>
			{children || (
				<div className="flex items-center justify-center w-full h-full">
					<div className="text-center p-8">
						<div className="mb-6">🏆</div>
						<h2 className="text-3xl font-bold text-yellow-800 mb-4">
							축하합니다!
						</h2>
						<p className="text-yellow-700">우승자가 결정되었습니다</p>
					</div>
				</div>
			)}
		</SolvingFullModalLayout>
	);
};

export default SolvingWinner;
