import clsx from "clsx";
import { useParams } from "react-router-dom";
import useControlParticipants from "../../hooks/paticipant/useControlParticipants";

//
//
//

interface ControlParticipantRankingUserProps {
	hasTrailingComma: boolean;
	userId: number;
	name: string;
	nickName: string;
}

//
//
//

const ControlParticipantRankingUser = ({
	hasTrailingComma,
	userId,
	name,
	nickName,
}: ControlParticipantRankingUserProps) => {
	const questionSetId = Number(useParams().questionSetId);

	const { checkIsActiveParticipant } = useControlParticipants({
		questionSetId,
	});

	return (
		<span
			className={clsx("typo-body-small", {
				"text-color-gray-30": !checkIsActiveParticipant(userId),
			})}
		>
			{name}({nickName}){hasTrailingComma && ", "}
		</span>
	);
};

export default ControlParticipantRankingUser;
