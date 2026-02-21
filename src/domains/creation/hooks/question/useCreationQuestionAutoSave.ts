import { useEffect, useRef } from "react";
import useCreationQuestion from "./_useCreationQuestion";

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

		const autoSaveTimer = setTimeout(() => {
			saveQuestionRef.current();
		}, AUTO_UPDATE_INTERVAL);

		return () => {
			clearTimeout(autoSaveTimer);
		};
	}, [isDirty]);
};

export default useCreationQuestionAutoSave;
