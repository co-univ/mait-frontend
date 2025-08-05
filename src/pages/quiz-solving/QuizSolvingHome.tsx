import React from "react";
import { useNavigate } from "react-router-dom";

//
//
//

const QuizSolvingHome = () => {
	const navigate = useNavigate();

	/**
	 * 
	 */
	const handleStartButtonClick = () => {
		navigate('/quiz-solving/7');
	}

	return (
		<div className="text-alpha-black100 typo-heading-xlarge">
			문제 풀기 페이지입니다. 문제 풀기 페이지입니다.
			<button
				className="px-padding-8 py-padding-4 flex justify-center items-center w-fit h-size-height-6 rounded-radius-medium1 bg-secondary-50 typo-body-xsmall text-alpha-white100"
				type="button"
				onClick={handleStartButtonClick}
			>
				문제 풀기
			</button>
		</div>
	);
};

export default QuizSolvingHome;
