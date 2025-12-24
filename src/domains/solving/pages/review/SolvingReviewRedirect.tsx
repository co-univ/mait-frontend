import { useParams } from "react-router-dom";
import Loading from "@/pages/Loading";

//
//
//

const SolvingReviewRedirect = () => {
	const questionSetId = Number(useParams().questionSetId);

	console.log(questionSetId);

	return <Loading />;
};

export default SolvingReviewRedirect;
