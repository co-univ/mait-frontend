import { useEffect } from "react";
import { useBeforeUnload, useBlocker, useParams } from "react-router-dom";
import { useConfirm } from "@/components/confirm";
import EmptyQuestion from "@/components/EmptyQuestion";
import useCreationQuestion from "@/domains/creation/hooks/question/_useCreationQuestion";
import CreationQuestionLayout from "@/domains/creation/layouts/question/CreationQuestionLayout";
import CreationQuestionAdditional from "@/domains/creation/pages/question/additional/CreationQuestionAdditional";
import CreationQuestionMain from "@/domains/creation/pages/question/CreationQuestionMain";
import CreationQuestionNavigation from "../../components/question/CreationQuestionNavigation";
import useCreationQuestionAutoSave from "../../hooks/question/useCreationQuestionAutoSave";
import useCreationQuestionStore from "../../stores/question/_useCreationQuestionStore";

//
//
//

const CreationQuestion = () => {
	const questionSetId = Number(useParams().questionSetId);
	const questionId = Number(useParams().questionId);

	const { resetStore } = useCreationQuestionStore();

	const { isDirty } = useCreationQuestion({
		questionSetId,
		questionId,
	});

	const blocker = useBlocker(({ nextLocation }) => {
		return isDirty && !nextLocation.pathname.startsWith("/creation/question");
	});

	const { confirm } = useConfirm();

	//
	//
	//
	useBeforeUnload((e) => {
		if (isDirty) {
			e.preventDefault();
			e.returnValue = "";
		}
	});

	//
	//
	//
	useCreationQuestionAutoSave({
		questionSetId,
		questionId,
	});

	//
	// Block navigation when there are unsaved changes
	//
	useEffect(() => {
		if (blocker.state === "blocked") {
			confirm({
				title: "편집 중인 문제가 있습니다.",
				description:
					"페이지를 떠나시겠습니까? (편집 내용은 저장되지 않습니다.)",
			}).then((result) => {
				if (result) {
					blocker.proceed();
				} else {
					blocker.reset();
				}
			});
		}
	}, [blocker, confirm]);

	//
	//
	//
	useEffect(() => {
		return () => resetStore();
	}, [resetStore]);

	return (
		<CreationQuestionLayout>
			<CreationQuestionNavigation
				questionSetId={questionSetId}
				questionId={questionId}
			/>
			{questionId !== 0 ? (
				<>
					<CreationQuestionMain
						questionSetId={questionSetId}
						questionId={questionId}
					/>
					<CreationQuestionAdditional
						questionSetId={questionSetId}
						questionId={questionId}
					/>
				</>
			) : (
				<EmptyQuestion />
			)}
		</CreationQuestionLayout>
	);
};

export default CreationQuestion;
