import HomeSlide from "../../components/common/HomeSlide";
import HomeFirst from "./HomeFirst";
import HomeSecond from "./HomeSecond";
import HomeThird from "./HomeThird";

//
//
//

const Home = () => {
	return (
		<div
			className="w-full h-screen overflow-y-scroll snap-mandatory snap-y"
			style={{ scrollbarWidth: "none" }}
		>
			{/** biome-ignore lint/nursery/useUniqueElementIds: ID for GA data */}
			<HomeSlide id="home_1">
				<HomeFirst />
			</HomeSlide>
			{/** biome-ignore lint/nursery/useUniqueElementIds: ID for GA data */}
			<HomeSlide id="home_2">
				<HomeSecond />
			</HomeSlide>
			{/** biome-ignore lint/nursery/useUniqueElementIds: ID for GA data */}
			<HomeSlide id="home_3">
				<HomeThird />
			</HomeSlide>
		</div>
	);
};

export default Home;
