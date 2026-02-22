import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createPath } from "@/utils/create-path";
import { CREATION_ROUTE_PATH } from "../../creation.routes";
import useCreationQuestion from "./useCreationQuestion";

//
//
//

const AUTO_UPDATE_INTERVAL = 60 * 1000;

interface UseCreationQuestionAutoSaveProps {
	questionSetId: number;
	questionId: number;
}

//
//
//

const useCreationQuestionAutoSave = ({
	questionSetId,
	questionId,
}: UseCreationQuestionAutoSaveProps) => {
	const { isDirty, saveQuestion } = useCreationQuestion({
		questionSetId,
		questionId,
	});

	const saveQuestionRef = useRef(saveQuestion);

	const navigate = useNavigate();

	//
	//
	//
	useEffect(() => {
		saveQuestionRef.current = saveQuestion;
	}, [saveQuestion]);

	//
	//
	//
	useEffect(() => {
		if (!isDirty) {
			return;
		}

		const autoSaveTimer = setTimeout(async () => {
			const saveResult = await saveQuestionRef.current();

			if (saveResult?.data?.id) {
				navigate(
					createPath(CREATION_ROUTE_PATH.QUESTION, {
						questionSetId,
						questionId: saveResult.data.id,
					}),
					{
						replace: true,
					},
				);
			}
		}, AUTO_UPDATE_INTERVAL);

		return () => {
			clearTimeout(autoSaveTimer);
		};
	}, [isDirty, navigate, questionSetId]);
};

export default useCreationQuestionAutoSave;
