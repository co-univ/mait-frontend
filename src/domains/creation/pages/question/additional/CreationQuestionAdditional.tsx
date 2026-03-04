import CreationQuestionAdditionalDropdown from "@/domains/creation/components/question/additional/CreationQuestionAdditionalDropdown";
import CreationQuestionAdditionalButtons from "@/domains/creation/pages/question/additional/CreationQuestionAdditionalButtons";
import CreationQuestionAdditionalFields from "@/domains/creation/pages/question/additional/CreationQuestionAdditionalFields";

//
//
//

interface CreationQuestionAdditionalProps {
	titleInputContainerRef: React.RefObject<HTMLDivElement | null>;
	questionSetId: number;
	questionId: number;
}

//
//
//

const CreationQuestionAdditional = ({
	titleInputContainerRef,
	questionSetId,
	questionId,
}: CreationQuestionAdditionalProps) => {
	return (
		<div className="h-full w-[268px] flex flex-col gap-gap-11">
			<div
				style={{
					height: titleInputContainerRef.current?.clientHeight,
				}}
			/>
			<CreationQuestionAdditionalButtons
				questionSetId={questionSetId}
				questionId={questionId}
			/>
			<CreationQuestionAdditionalDropdown
				questionSetId={questionSetId}
				questionId={questionId}
			/>
			<CreationQuestionAdditionalFields
				questionSetId={questionSetId}
				questionId={questionId}
			/>
		</div>
	);
};

export default CreationQuestionAdditional;
