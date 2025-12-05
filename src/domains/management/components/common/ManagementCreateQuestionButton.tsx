import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { CREATION_ROUTE_PATH } from "@/domains/creation/creation.routes";

//
//
//

const ManagementCreateQuestionButton = () => {
	const navigate = useNavigate();

	/**
	 *
	 */
	const handleButtonClick = () => {
		navigate(CREATION_ROUTE_PATH.NEW);
	};

	return (
		<Button item="새 문제 만들기" icon={<Plus />} onClick={handleButtonClick} />
	);
};

export default ManagementCreateQuestionButton;
