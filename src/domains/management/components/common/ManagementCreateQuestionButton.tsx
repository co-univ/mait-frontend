import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";

//
//
//

const ManagementCreateQuestionButton = () => {
	const navigate = useNavigate();

	/**
	 *
	 */
	const handleButtonClick = () => {
		navigate("/creation/new");
	};

	return (
		<Button item="새 문제 만들기" icon={<Plus />} onClick={handleButtonClick} />
	);
};

export default ManagementCreateQuestionButton;
