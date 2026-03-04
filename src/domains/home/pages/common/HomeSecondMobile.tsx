import HomeSlide from "../../components/common/HomeSlide";
import HomeSecondMobileFirst from "./HomeSecondMobileFirst";
import HomeSecondMobileSecond from "./HomeSecondMobileSecond";

//
//
//

const HomeSecondMobile = () => {
	return (
		<div
			className="w-full h-screen overflow-y-scroll snap-mandatory snap-y overflow-x-hidden"
			style={{ scrollbarWidth: "none" }}
		>
			<HomeSlide>
				<HomeSecondMobileFirst />
			</HomeSlide>
			<HomeSlide>
				<HomeSecondMobileSecond />
			</HomeSlide>
		</div>
	);
};

export default HomeSecondMobile;
