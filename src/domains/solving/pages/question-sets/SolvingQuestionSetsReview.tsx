// TEMP: backend removed QuestionSet.visibility from the API response; filter disabled, kept for when it returns.
// import QuestionSetsFilter from "@/components/question-sets/QuestionSetsFilter";
// import useQuestionSetsFilter from "@/components/question-sets/useQuestionSetsFilter";
import QuestionSetsCardsLayout from "@/layouts/question-sets/QuestionSetsCardsLayout";
import type { QuestionSetDto } from "@/libs/types";
import SolvingQuestionSetsReviewCard from "../../components/question-sets/SolvingQuestionSetsReviewCard";

//
//
//

interface SolvingQuestionSetsReviewProps {
	questionSets: QuestionSetDto[];
	isLoading: boolean;
}

//
//
//

const SolvingQuestionSetsReview = ({
	questionSets,
	isLoading,
}: SolvingQuestionSetsReviewProps) => {
	// TEMP: backend removed QuestionSet.visibility from the API response; filter disabled, kept for when it returns.
	// const { getIsVisibilityFiltered } = useQuestionSetsFilter();

	return (
		<div className="flex flex-col gap-gap-11 h-full">
			{/* TEMP: backend removed QuestionSet.visibility from the API response; filter disabled, kept for when it returns.
			<QuestionSetsFilter visibilities={["PUBLIC", "GROUP"]} />
			*/}

			<QuestionSetsCardsLayout isLoading={isLoading}>
				{questionSets
					// TEMP: backend removed QuestionSet.visibility from the API response; filter disabled, kept for when it returns.
					// .filter((questionSet) =>
					// 	questionSet.visibility
					// 		? questionSet.visibility !== "PRIVATE" &&
					// 			getIsVisibilityFiltered(questionSet.visibility)
					// 		: false,
					// )
					.map((questionSet) => (
						<SolvingQuestionSetsReviewCard
							key={questionSet.id}
							questionSet={questionSet}
						/>
					))}
			</QuestionSetsCardsLayout>
		</div>
	);
};

export default SolvingQuestionSetsReview;
