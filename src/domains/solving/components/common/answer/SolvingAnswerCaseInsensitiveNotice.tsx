import { CircleAlert } from "lucide-react";
import { useState } from "react";
import Tooltip from "@/components/Tooltip";

//
//
//

const SolvingAnswerCaseInsensitiveNotice = () => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div className="mb-padding-6">
			<Tooltip
				open={isHovered}
				placement="right"
				offset={22}
				message="주관식 답변은 대·소문자를 구분하지 않고 정답 처리됩니다."
			>
				<CircleAlert
					size={24}
					className="shrink-0 text-color-alpha-black100"
					onMouseOver={() => setIsHovered(true)}
					onMouseOut={() => setIsHovered(false)}
				/>
			</Tooltip>
		</div>
	);
};

export default SolvingAnswerCaseInsensitiveNotice;
