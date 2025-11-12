import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import youth from "./happy-youth.png";

//
//
//

const POLLING_INTERVAL = 10 * 1000;

//
//
//

const CreationNewLoading = () => {
	const teamId = Number(useParams().teamId);
	const questionSetId = Number(useParams().questionSetId);

	const navigate = useNavigate();

	//
	//
	// biome-ignore lint/correctness/useExhaustiveDependencies: checkStatus only needs to run on mount
	useEffect(() => {
		if (!questionSetId) {
			navigate(`/management/team/${teamId}`);
		}

		const checkStatus = () => {
			console.log("Checking status", new Date().toISOString());
		};

		const intervalId = setInterval(() => {
			checkStatus();
		}, POLLING_INTERVAL);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return (
		<div className="flex justify-center items-center h-full flex-col gap-[80px]">
			<div className="relative">
				<motion.img
					src={youth}
					alt="Youth"
					className="w-[480px] rounded-radius-xlarge2"
					animate={{
						x: [0, 120, 240, 120, 0, -120, -240, -120, 0],
						y: [0, -40, 0, 40, 0, 40, 0, -40, 0],
					}}
					transition={{
						duration: 6,
						repeat: Infinity,
						ease: "linear",
					}}
				/>
			</div>
			<span className="typo-heading-large">
				유씽씽이 만든 AI가 문제 만드는 중
			</span>
		</div>
	);
};

export default CreationNewLoading;
