import clsx from "clsx";
import { Circle } from "lucide-react";
import { Table } from "@/components/table";
import type {
	QuestionAnswerSubmitRecordApiResponse,
	SubmitAnswerDtoObject,
} from "@/libs/types";

//
//
//

interface ControlSolvingSubmissionTableBodyProps {
	submitType: "all" | "correct" | "incorrect";
	submitRecords?: QuestionAnswerSubmitRecordApiResponse[];
}

//
//
//

const ControlSolvingSubmissionTableBody = ({
	submitType,
	submitRecords,
}: ControlSolvingSubmissionTableBodyProps) => {
	let records: QuestionAnswerSubmitRecordApiResponse[] = [];

	switch (submitType) {
		case "all":
			records = submitRecords || [];
			break;
		case "correct":
			records = submitRecords?.filter((record) => record.isCorrect) || [];
			break;
		case "incorrect":
			records = submitRecords?.filter((record) => !record.isCorrect) || [];
			break;
	}

	/**
	 *
	 */
	const renderSubmittedAnswer = (submittedAnswer: SubmitAnswerDtoObject) => {
		switch (submittedAnswer.type) {
			case "MULTIPLE": {
				return submittedAnswer.submitAnswers?.join(", ");
			}
			case "SHORT": {
				return submittedAnswer.submitAnswers?.join(", ");
			}
			case "ORDERING": {
				return submittedAnswer.submitAnswers
					?.map((answer) => String.fromCharCode(64 + Number(answer)))
					.join(" → ");
			}
			case "FILL_BLANK": {
				return submittedAnswer.submitAnswers
					?.map((answer) => answer.answer)
					.join(",");
			}
		}
	};

	return (
		<Table.Body>
			{records.map((record, index) => (
				<>
					<Table.Row key={record.id}>
						<Table.Cell>
							<Circle
								size={16}
								className={clsx(
									"px-padding-1 drop-shadow-md",
									record.isCorrect
										? "fill-color-success-50 text-color-success-50"
										: "fill-color-danger-50 text-color-danger-50",
								)}
							/>
						</Table.Cell>
						<Table.Cell width="100px">{record.userName}</Table.Cell>
						<Table.Cell grow className="typo-body-small-bold">
							<span className="ml-padding-4">
								{renderSubmittedAnswer(record.submittedAnswer)}
							</span>
						</Table.Cell>
						<Table.Cell width="158px" className="truncate">
							{record.userNickname}
						</Table.Cell>
					</Table.Row>
					{index < records.length - 1 && <Table.Divider />}
				</>
			))}
		</Table.Body>
	);
};

export default ControlSolvingSubmissionTableBody;
