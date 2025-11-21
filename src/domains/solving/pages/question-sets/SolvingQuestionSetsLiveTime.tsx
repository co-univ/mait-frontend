import QuestionSetsLable from "@/components/question-sets/QuestionSetsLable";
import QuestionSetsCardsLayout from "@/layouts/question-sets/QuestionSetsCardsLayout";
import type { QuestionSetGroup } from "@/libs/types";
import SolvingQuestionSetsLiveTimeCard from "../../components/question-sets/SolvingQuestionSetsLiveTimeCard";

//
//
//

interface SolvingQuestionSetsLiveTimeProps {
	questionSetGroup?: QuestionSetGroup["questionSets"];
}

//
//
//

const SolvingQuestionSetsLiveTime = ({
	questionSetGroup,
}: SolvingQuestionSetsLiveTimeProps) => {
	const ongoingQuestionSets = questionSetGroup?.ONGOING ?? [];
	const beforeQuestionSets = questionSetGroup?.BEFORE ?? [];
	const afterQuestionSets = questionSetGroup?.AFTER ?? [];

	const hasOngoingQuestionSets = ongoingQuestionSets.length > 0;
	const hasBeforeQuestionSets = beforeQuestionSets.length > 0;
	const hasAfterQuestionSets = afterQuestionSets.length > 0;

	return (
		<div className="flex flex-col gap-gap-11">
			{hasOngoingQuestionSets && (
				<div className="flex flex-col gap-gap-11">
					<div className="flex justify-between items-center">
						<QuestionSetsLable label="진행중" variant="secondary" />
					</div>
					<QuestionSetsCardsLayout minGridWidth={280}>
						{ongoingQuestionSets.map((questionSet) => (
							<SolvingQuestionSetsLiveTimeCard
								key={questionSet.id}
								questionSet={questionSet}
							/>
						))}
					</QuestionSetsCardsLayout>
				</div>
			)}

			{hasBeforeQuestionSets && (
				<div className="flex flex-col gap-gap-11">
					<div className="flex justify-between items-center">
						<QuestionSetsLable label="진행 예정" variant="secondary" />
					</div>
					<QuestionSetsCardsLayout minGridWidth={280}>
						{beforeQuestionSets.map((questionSet) => (
							<SolvingQuestionSetsLiveTimeCard
								key={questionSet.id}
								questionSet={questionSet}
							/>
						))}
					</QuestionSetsCardsLayout>
				</div>
			)}

			{hasAfterQuestionSets && (
				<div className="flex flex-col gap-gap-11">
					<div className="flex justify-between items-center">
						<QuestionSetsLable label="종료" variant="secondary" />
					</div>
					<QuestionSetsCardsLayout minGridWidth={280}>
						{afterQuestionSets.map((questionSet) => (
							<SolvingQuestionSetsLiveTimeCard
								key={questionSet.id}
								questionSet={questionSet}
							/>
						))}
					</QuestionSetsCardsLayout>
				</div>
			)}
		</div>
	);
};

export default SolvingQuestionSetsLiveTime;
