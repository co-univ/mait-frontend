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
	return (
		<div className="flex flex-col gap-gap-9">
			<div className="w-full min-h-[63.5px] py-padding-9 px-padding-12 border border-color-gray-40 rounded-radius-medium1 typo-body-medium">
				{content}
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
