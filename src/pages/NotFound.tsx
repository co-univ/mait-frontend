import { Link } from "react-router-dom";
import notFoundImage from "@/assets/images/not-found-image.png";
import { HOME_ROUTE_PATH } from "@/domains/home/home.routes";

//
//
//

const NotFound = () => {
	return (
		<div className="w-full h-full flex flex-col justify-center items-center gap-gap-11 md:gap-gap-9 px-5 md:px-0">
			<div className="w-full flex flex-col items-center gap-gap-9">
				<img src={notFoundImage} alt="Not Found" />
				<h1 className="typo-heading-medium md:typo-heading-large text-center">
					앗...찾으시는 페이지가 없어요
				</h1>
				<span className="typo-body-small md:typo-body-large">
					주소가 잘못되었거나 페이지가 삭제되었을 수 있어요.
				</span>
			</div>
			<Link
				to={HOME_ROUTE_PATH.ROOT}
				className="typo-heading-xsmall text-color-primary-50 underline"
			>
				홈으로 이동
			</Link>
		</div>
	);
};

export default NotFound;
