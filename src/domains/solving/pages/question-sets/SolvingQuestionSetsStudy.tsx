import QuestionSetsLable from '@/components/question-sets/QuestionSetsLable';
import QuestionSetsCardsLayout from '@/layouts/question-sets/QuestionSetsCardsLayout';
import SolvingQuestionSetsStudyCard from '../../components/question-sets/SolvingQuestionSetsStudyCard';
import type { QuestionSetDto, QuestionSetGroup } from '@/libs/types';

//
//
//

interface SolvingQuestionSetsStudyProps {
  questionSetGroup?: QuestionSetGroup["questionSets"];
  isLoading: boolean;
}

//
//
//

const SolvingQuestionSetsStudy = ({
  questionSetGroup,
  isLoading,
}: SolvingQuestionSetsStudyProps) => {
  const questionSets = Object.values(questionSetGroup ?? {}).flat() as QuestionSetDto[];

	const beforeQuestionSets = questionSets.filter(
		(questionSet) => questionSet.userStudyStatus === "BEFORE",
	);
	const ongoingQuestionSets = questionSets.filter(
		(questionSet) => questionSet.userStudyStatus === "ONGOING",
	);
	const afterQuestionSets = questionSets.filter(
		(questionSet) => questionSet.userStudyStatus === "AFTER",
	);

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
							<SolvingQuestionSetsStudyCard
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
							<SolvingQuestionSetsStudyCard
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
							<SolvingQuestionSetsStudyCard
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

export default SolvingQuestionSetsStudy;
