import { Link } from "react-router-dom";
import RedBell from "@/assets/images/red-bell.svg";

//
//
//

const ErrorDetect = () => {
	return (
		<div className="w-full h-full flex flex-col justify-center items-center gap-gap-9">
			<RedBell />
			<h1 className="typo-heading-large text-center">
				예상치 못한 문제가 발생했어요
			</h1>
			<span className="typo-body-large">
				페이지를 새로고침하거나 잠시 후 다시 시도해 주세요.
			</span>
			<button
				type="button"
				onClick={() => window.location.reload()}
				className="typo-heading-xsmall text-color-primary-50 underline"
			>
				새로고침하기
			</button>
		</div>
	);
};

export default ErrorDetect;
