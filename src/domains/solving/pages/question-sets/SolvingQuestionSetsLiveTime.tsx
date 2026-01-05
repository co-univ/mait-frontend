import QuestionSetsLable from "@/components/question-sets/QuestionSetsLable";
import QuestionSetsCardsLayout from "@/layouts/question-sets/QuestionSetsCardsLayout";
import type { QuestionSetGroup } from "@/libs/types";
import SolvingQuestionSetsLiveTimeCard from "../../components/question-sets/SolvingQuestionSetsLiveTimeCard";

//
//
//

interface SolvingQuestionSetsLiveTimeProps {
	questionSetGroup?: QuestionSetGroup["questionSets"];
	isLoading: boolean;
}

//
//
//

const SolvingQuestionSetsLiveTime = ({
	questionSetGroup,
	isLoading,
}: SolvingQuestionSetsLiveTimeProps) => {
	const ongoingQuestionSets = questionSetGroup?.ONGOING ?? [];
	const beforeQuestionSets = questionSetGroup?.BEFORE ?? [];
	const afterQuestionSets = questionSetGroup?.AFTER ?? [];

	const hasOngoingQuestionSets = ongoingQuestionSets.length > 0;
	const hasBeforeQuestionSets = beforeQuestionSets.length > 0;
	const hasAfterQuestionSets = afterQuestionSets.length > 0;
	const hasAnyQuestionSets =
		hasOngoingQuestionSets || hasBeforeQuestionSets || hasAfterQuestionSets;

	if (isLoading) {
		return null;
	}

	if (!hasAnyQuestionSets) {
		return <QuestionSetsCardsLayout isLoading={false} />;
	}

	return (
		<div className="h-full flex flex-col gap-gap-11">
			{hasOngoingQuestionSets && (
				<div className="flex flex-col gap-gap-11">
					<div className="flex justify-between items-center">
						<QuestionSetsLable label="풀이 중" variant="secondary" />
					</div>
					<QuestionSetsCardsLayout isLoading={false} minGridWidth={280}>
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
						<QuestionSetsLable label="풀이 전" variant="secondary" />
					</div>
					<QuestionSetsCardsLayout isLoading={false} minGridWidth={280}>
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
						<QuestionSetsLable label="풀이 완료" variant="secondary" />
					</div>
					<QuestionSetsCardsLayout isLoading={false} minGridWidth={280}>
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
