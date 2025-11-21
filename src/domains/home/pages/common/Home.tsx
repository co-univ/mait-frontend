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
			<HomeSlide>
				<HomeFirst />
			</HomeSlide>
			<HomeSlide>
				<HomeSecond />
			</HomeSlide>
			<HomeSlide>
				<HomeThird />
			</HomeSlide>
		</div>
	);
};

export default Home;
