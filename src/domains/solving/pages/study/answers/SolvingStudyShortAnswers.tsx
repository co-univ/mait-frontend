import { useEffect } from "react";
import type { ShortQuestionApiResponse } from "@/libs/types";
import SolvingAnswerShort from "@/domains/solving/components/common/answer/SolvingAnswerShort";
import useSolvingQuestion from "@/domains/solving/hooks/common/useSolvingQuestion";
import useSolvingStudyAnswerStore from "@/domains/solving/stores/study/useSolvingStudyAnswerStore";

//
//
//

interface SolvingStudyShortAnswersProps {
	questionSetId: number;
	questionId: number;
	readOnly?: boolean;
	isCorrect: boolean | null;
}

//
//
//

const SolvingStudyShortAnswers = ({
	questionSetId,
	questionId,
	readOnly = false,
	isCorrect,
}: SolvingStudyShortAnswersProps) => {
	const { question } = useSolvingQuestion({
		questionSetId,
		questionId,
		mode: "STUDY",
	});

	const shortQuestion = question as ShortQuestionApiResponse | undefined;
	const answerCount = shortQuestion?.answerCount ?? 0;

	const { getUserAnswers, setUserAnswers } = useSolvingStudyAnswerStore();
	const userAnswers = getUserAnswers(questionId) as string[];

	/**
	 *
	 */
	const handleAnswerChange = (index: number, value: string) => {
		if (readOnly) {
			return;
		}

		const newAnswers = [...userAnswers];
		newAnswers[index] = value;
		setUserAnswers(questionId, newAnswers);
	};

	const getVariation = (index: number) => {
		const answer = userAnswers[index] ?? "";
		if (answer === "") {
			return "default";
		}

		if (!readOnly) {
			return "focused";
		}

		return isCorrect ? "correct" : "incorrect";
	};

	useEffect(() => {
		if (answerCount > 0 && userAnswers.length !== answerCount) {
			setUserAnswers(
				questionId,
				Array.from({ length: answerCount }, () => ""),
			);
		}
	}, [answerCount, userAnswers.length, questionId, setUserAnswers]);

	return (
		<div className="flex flex-col w-full gap-gap-11">
			{userAnswers.map((answer, index) => (
				<SolvingAnswerShort
					// biome-ignore lint/suspicious/noArrayIndexKey: order of short answers is fixed
					key={index}
					readOnly={readOnly}
					variation={getVariation(index)}
					answer={answer}
					onChange={(value) => handleAnswerChange(index, value)}
				/>
			))}
		</div>
	);
};

export default SolvingStudyShortAnswers;
