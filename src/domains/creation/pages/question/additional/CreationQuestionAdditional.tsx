import CreationQuestionAdditionalDropdown from "@/domains/creation/components/question/additional/CreationQuestionAdditionalDropdown";
import CreationQuestionAdditionalButtons from "@/domains/creation/pages/question/additional/CreationQuestionAdditionalButtons";

//
//
//

const CreationQuestionAdditional = () => {
	return (
		<div className="h-full w-[268px] flex flex-col gap-gap-11">
			<CreationQuestionAdditionalButtons />
			<CreationQuestionAdditionalDropdown />
		</div>
	);
};

export default CreationQuestionAdditional;
