import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "@/components/confirm";
import { apiHooks } from "@/libs/api";
import type { QuestionApiResponse, QuestionType } from "@/libs/types";

//
//
//

type QuestionMode = "LIVE_TIME" | "REVIEW" | "STUDY";

interface UseQuestionProps {
	questionSetId: number;
	questionId: number;
	mode: QuestionMode;
}

interface UseQuestionReturn {
	question: QuestionApiResponse | undefined;
	content: string | undefined;
	number: number | undefined;
	imageUrl: string | undefined;
	type: QuestionType | undefined;
	isLoading: boolean;
}

//
//
//

const useSolvingQuestion = ({
	questionSetId,
	questionId,
	mode,
}: UseQuestionProps): UseQuestionReturn => {
	const navigate = useNavigate();
	
	const { confirm } = useConfirm();

	const { data, isPending, error } = apiHooks.useQuery(
		"get",
		"/api/v1/question-sets/{questionSetId}/questions/{questionId}",
		{
			params: {
				path: {
					questionSetId,
					questionId,
				},
				query: {
					mode,
				},
			},
		},
		{ retry: false },
	);

	const question = data?.data as QuestionApiResponse | undefined;

	const errorCode = (error as { code?: string } | null)?.code;

	//
	useEffect(() => {
		if (errorCode !== "2001") return;

		confirm({
			title: "풀이 종료",
			description: "이미 종료된 문제셋입니다.",
			hideCancelButton: true,
			disableHistoryTrap: true,
		}).then(() => navigate("/solving/question-sets"));
	}, [errorCode, confirm, navigate]);

	return {
		question,
		content: question?.content,
		number: question?.number,
		imageUrl: question?.imageUrl,
		type: question?.type as QuestionType | undefined,
		isLoading: isPending,
	};
};

export default useSolvingQuestion;
