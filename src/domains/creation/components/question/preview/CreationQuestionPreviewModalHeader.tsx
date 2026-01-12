import { LogIn } from "lucide-react";
import { HEADER_HEIGHT } from "@/app.constants";
import Button from "@/components/Button";

//
//
//

const CreationQuestionPreviewModalHeader = () => {
	return (
		<div
			className="w-full py-padding-11 px-padding-12"
			style={{
				height: HEADER_HEIGHT,
			}}
		>
			<Button
				disabled
				icon={<LogIn />}
				item="pdf 저장"
				className="bg-color-gray-5 text-color-gray-20 border-none"
			/>
		</div>
	);
};

export default CreationQuestionPreviewModalHeader;
