import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//
//
//

const QuizSolvingRealTimeWaitView = () => {
	return (
		<div className="bg-gradient-to-b from-alpha-white100 to-primary-5 flex justify-center items-center w-screen h-screen fixed top-0 left-0">
			<div className="p-padding-12 w-[68.5rem] h-[5.875rem] flex items-center justify-center rounded-radius-medium1 bg-primary-5">
				<p className="text-primary-50 typo-heading-medium">
					곧 문제가 시작됩니다. 잠시만 기다려 주세요!
				</p>
			</div>
		</div>
	);
};

export default QuizSolvingRealTimeWaitView;
