import { useEffect } from "react";
import type {
	FillBlankQuestionApiResponse,
	FillBlankSubmitAnswer,
} from "@/libs/types";
import SolvingAnswerFillBlank from "../../../components/common/answer/SolvingAnswerFillBlank";
import useQuestion from "../../../hooks/common/useQuestion";
import useSolvingLiveAnswerStore from "../../../stores/live/useSolvingLiveAnswerStore";

//
//
//

interface SolvingLiveFillBlankAnswersProps {
	questionSetId: number;
	questionId: number;
	isDisabled: boolean;
}

//
//
//

const SolvingLiveFillBlankAnswers = ({
	questionSetId,
	questionId,
	isDisabled,
}: SolvingLiveFillBlankAnswersProps) => {
	const { question } = useQuestion({
		questionSetId,
		questionId,
		mode: "LIVE_TIME",
	});

	const fillBlankQuestion = question as
		| FillBlankQuestionApiResponse
		| undefined;
	const blankCount = fillBlankQuestion?.blankCount ?? 0;

	const { getUserAnswers, setUserAnswers } = useSolvingLiveAnswerStore();

	const userAnswers = getUserAnswers() as FillBlankSubmitAnswer[];

	/**
	 *
	 */
	const handleAnswerChange = (number: number, answer: string) => {
		if (isDisabled) {
			return;
		}

		const updatedAnswers = userAnswers.map((ans) =>
			ans.number === number ? { number, answer } : ans,
		);

		setUserAnswers(updatedAnswers);
	};

	/**
	 *
	 */
	const getAnswerVariation = (number: number): "default" | "focused" => {
		const answer = userAnswers.find(
			(userAnswer) => userAnswer.number === number,
		);
		return answer?.answer === "" ? "default" : "focused";
	};

	//
	useEffect(() => {
		if (blankCount > 0 && userAnswers.length !== blankCount) {
			const initialAnswers: FillBlankSubmitAnswer[] = Array.from(
				{ length: blankCount },
				(_, index) => ({
					number: index + 1,
					answer: "",
				}),
			);

			setUserAnswers(initialAnswers);
		}
	}, [blankCount, userAnswers.length, setUserAnswers]);

	return (
		<div className="w-full flex flex-col gap-gap-11">
			{userAnswers.map((answer) => (
				<SolvingAnswerFillBlank
					key={answer.number}
					readOnly={isDisabled}
					answer={answer}
					variation={getAnswerVariation(answer.number)}
					onAnswerChange={handleAnswerChange}
				/>
			))}
		</div>
	);
};

export default SolvingLiveFillBlankAnswers;
