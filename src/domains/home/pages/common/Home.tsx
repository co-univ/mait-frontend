import HomeSlide from "../../components/common/HomeSlide";
import HomeFirst from "./HomeFirst";

//
//
//

const Home = () => {
	return (
		<div
			className="w-full h-full overflow-y-scroll snap-mandatory snap-y"
			style={{ scrollbarWidth: "none" }}
		>
			<HomeSlide>
				<HomeFirst />
			</HomeSlide>
		</div>
	);
};

export default Home;
