import CreationLayout from "@/domains/creation/layouts/common/CreationLayout";
import CreationQuestion from "@/domains/creation/pages/question/CreationQuestion";

//
//
//

const Creation = () => {
	return (
		<CreationLayout>
			<div className="w-[64px] h-full bg-black"></div>
			<CreationQuestion />
			<div className="w-[268px] h-full bg-black"></div>
		</CreationLayout>
	);
};

export default Creation;
