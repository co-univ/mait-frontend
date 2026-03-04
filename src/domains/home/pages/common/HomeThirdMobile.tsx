import HomeSlide from "../../components/common/HomeSlide";
import HomeThirdMobileFirst from "./HomeThirdMobileFirst";
import HomeThirdMobileSecond from "./HomeThirdMobileSecond";

//
//
//

const HomeThirdMobile = () => {
	return (
		<div
			className="w-full h-screen overflow-y-scroll snap-mandatory snap-y overflow-x-hidden"
			style={{ scrollbarWidth: "none" }}
		>
			<HomeSlide>
				<HomeThirdMobileFirst />
			</HomeSlide>
			<HomeSlide>
				<HomeThirdMobileSecond />
			</HomeSlide>
		</div>
	);
};

export default HomeThirdMobile;
