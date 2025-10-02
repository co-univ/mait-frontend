import CreationQuestionAdditionalDropdown from "@/domains/creation/components/question/additional/CreationQuestionAdditionalDropdown";
import CreationQuestionAdditionalButtons from "@/domains/creation/pages/question/additional/CreationQuestionAdditionalButtons";
import CreationQuestionAdditionalFields from "@/domains/creation/pages/question/additional/CreationQuestionAdditionalFields";

//
//
//

const CreationQuestionAdditional = () => {
	return (
		<div className="h-full w-[268px] flex flex-col gap-gap-11">
			<CreationQuestionAdditionalButtons />
			<CreationQuestionAdditionalDropdown />
			<CreationQuestionAdditionalFields />
		</div>
	);
};

export default CreationQuestionAdditional;
