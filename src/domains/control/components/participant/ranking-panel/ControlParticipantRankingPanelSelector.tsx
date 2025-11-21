import Button from "@/components/Button";

//
//
//

interface ControlParticipantRankingPanelSelectorProps {
	ranking: string;
	selectedRank: number;
	onRankChange: (rank: number) => void;
	onApplySelection: () => void;
}

//
//
//

const ControlParticipantRankingPanelSelector = ({
	ranking,
	selectedRank,
	onRankChange,
	onApplySelection,
}: ControlParticipantRankingPanelSelectorProps) => {
	return (
		<div className="flex justify-between items-center p-padding-6 bg-color-primary-5 rounded-radius-medium1">
			<div className="flex items-center gap-gap-4 typo-body-small">
				<span>{ranking}</span>
				<input
					type="number"
					value={selectedRank}
					onChange={(e) => onRankChange(Number(e.target.value))}
					className="py-padding-4 w-[40px] text-center rounded-radius-medium1 focus:ring-1 focus:ring-color-primary-50 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
				/>
				<span>등 까지</span>
			</div>
			<Button
				item="선택"
				onClick={onApplySelection}
				className="border-none bg-color-alpha-white100 typo-body-small text-color-primary-50"
			/>
		</div>
	);
};

export default ControlParticipantRankingPanelSelector;
