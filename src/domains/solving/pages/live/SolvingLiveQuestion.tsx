import { useEffect, useState } from "react";
import QuestionContent from "@/components/QuestionContent";
import SolvingQuizImage from "../../components/common/SolvingQuizImage";
import SolvingSubmitResult from "../../components/common/SolvingSubmitResult";
import useSolvingQuestion from "../../hooks/common/useSolvingQuestion";
import useSolvingLiveAnswerSubmit from "../../hooks/live/useSolvingLiveAnswerSubmit";
import SolvingLayout from "../../layouts/common/SolvingLayout";
import useSolvingLiveAnswerStore from "../../stores/live/useSolvingLiveAnswerStore";
import SolvingLiveFillBlankAnswers from "./answers/SolvingLiveFillBlankAnswers";
import SolvingLiveMultipleAnswers from "./answers/SolvingLiveMultipleAnswers";
import SolvingLiveOrderingAnswers from "./answers/SolvingLiveOrderingAnswers";
import SolvingLiveShortAnswers from "./answers/SolvingLiveShortAnswers";
import SolvingLiveHeader from "./SolvingLiveHeader";

//
//
//

interface SolvingLiveQuestionProps {
	questionSetId: number;
	questionId: number;
	isSubmitAllowed: boolean;
	isFailed: boolean;
}

//
//
//

const SolvingLiveQuestion = ({
	questionSetId,
	questionId,
	isSubmitAllowed,
	isFailed,
}: SolvingLiveQuestionProps) => {
	const [showCorrect, setShowCorrect] = useState(false);

	const { content, number, imageUrl, type, isLoading } = useSolvingQuestion({
		questionSetId,
		questionId,
		mode: "LIVE_TIME",
	});

	const { getIsSubmitted, getIsCorrect, setQuestionType, reset } =
		useSolvingLiveAnswerStore();

	const isSubmitted = getIsSubmitted();
	const isCorrect = getIsCorrect();

	const { submitAnswer, isSubmitting } = useSolvingLiveAnswerSubmit();

	// 제출 비활성화 조건: 탈락했거나 제출 비허용이거나 제출 중인 상태인 경우
	const isSubmitDisabled = isFailed || !isSubmitAllowed || isSubmitting;

	// 답안 입력 비활성화 조건: 탈락한 경우만
	const isAnswerDisabled = isFailed;

	/**
	 *
	 */
	const handleAnswersSubmit = async () => {
		if (isSubmitDisabled) {
			return;
		}

		const success = await submitAnswer({ questionSetId, questionId });

		if (success) {
			setShowCorrect(true);
		}
	};

	/**
	 *
	 */
	const handleAnimationComplete = () => {
		const hideTimer = setTimeout(() => {
			setShowCorrect(false);
		}, 2000);

		return () => clearTimeout(hideTimer);
	};

	/**
	 *
	 */
	const renderQuestionAnswers = () => {
		if (!type) {
			return null;
		}

		const commonProps = {
			questionSetId,
			questionId,
			isDisabled: isAnswerDisabled,
		};

		switch (type) {
			case "MULTIPLE":
				return <SolvingLiveMultipleAnswers {...commonProps} />;
			case "SHORT":
				return <SolvingLiveShortAnswers {...commonProps} />;
			case "ORDERING":
				return <SolvingLiveOrderingAnswers {...commonProps} />;
			case "FILL_BLANK":
				return <SolvingLiveFillBlankAnswers {...commonProps} />;
			default:
				return null;
		}
	};

	//
	// biome-ignore lint/correctness/useExhaustiveDependencies: Reset data when the problem changes
	useEffect(() => {
		reset();
	}, [questionId]);

	// Set question type for answer component rendering
	useEffect(() => {
		if (type) {
			setQuestionType(type);
		}
	}, [type, setQuestionType]);

	if (isLoading) {
		return null;
	}

	return (
		<SolvingLayout>
			<SolvingSubmitResult
				correct={!!isCorrect}
				show={showCorrect}
				onAnimationComplete={handleAnimationComplete}
			/>

			<SolvingLiveHeader
				isSubmitted={isSubmitted}
				isCorrect={isCorrect}
				isSubmitDisabled={isSubmitDisabled}
				number={number}
				handleAnswersSubmit={handleAnswersSubmit}
			/>

			<QuestionContent content={content} />

			<SolvingQuizImage src={imageUrl} />

			<div className="h-full flex flex-col justify-end">
				{renderQuestionAnswers()}
			</div>
		</SolvingLayout>
	);
};

export default SolvingLiveQuestion;
