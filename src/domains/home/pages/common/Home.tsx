import useBreakpoint from "@/hooks/useBreakpoint";
import HomeSlide from "../../components/common/HomeSlide";
import HomeFirst from "./HomeFirst";
import HomeSecond from "./HomeSecond";
import HomeSecondMobile from "./HomeSecondMobile";
import HomeThird from "./HomeThird";
import HomeThirdMobile from "./HomeThirdMobile";

//
//
//

const Home = () => {
	const { isSm, isLg } = useBreakpoint();

	return (
		<div
			className="w-full h-screen overflow-y-scroll snap-mandatory snap-y overflow-x-hidden"
			style={{ scrollbarWidth: "none" }}
		>
			{/** biome-ignore lint/nursery/useUniqueElementIds: ID for GA data */}
			<HomeSlide id="hero">
				<HomeFirst />
			</HomeSlide>
			{/** biome-ignore lint/nursery/useUniqueElementIds: ID for GA data */}
			<HomeSlide id="guide">
				{isLg && <HomeSecond />}
				{!isLg && <HomeSecondMobile />}
			</HomeSlide>
			{/** biome-ignore lint/nursery/useUniqueElementIds: ID for GA data */}
			<HomeSlide id="features">
				{isLg && <HomeThird />}
				{!isLg && <HomeThirdMobile />}
			</HomeSlide>
		</div>
	);
};

export default Home;
