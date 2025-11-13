import { motion } from "framer-motion";
import { useEffect } from "react";
import {
	useBeforeUnload,
	useBlocker,
	useNavigate,
	useParams,
} from "react-router-dom";
import { useConfirm } from "@/components/confirm";
import { notify } from "@/components/Toast";
import { apiClient } from "@/libs/api";
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

	const { confirm } = useConfirm();

	useBeforeUnload((e) => {
		e.preventDefault();
		e.returnValue = "";
	});

	const blocker = useBlocker(({ nextLocation }) => {
		return !nextLocation.pathname.startsWith("/creation/question");
	});

	//
	// Prevent navigaate other page while AI generation is in progress (only allow navigation to creation question page)
	//
	useEffect(() => {
		if (blocker.state === "blocked") {
			confirm({
				title: "페이지를 벗어나시겠습니까?",
				description:
					"AI 문제 생성이 진행 중입니다. 페이지를 벗어나면 생성이 취소됩니다.",
			}).then((result) => {
				if (result) {
					blocker.proceed();
				} else {
					blocker.reset();
				}
			});
		}
	}, [blocker, confirm]);

	//
	// polling for checking AI generation status
	// biome-ignore lint/correctness/useExhaustiveDependencies: checkStatus only needs to run on mount
	useEffect(() => {
		if (!questionSetId) {
			navigate(`/management/team/${teamId}`, { replace: true });
		}

		const checkStatus = async () => {
			try {
				const res = await apiClient.GET(
					"/api/v1/question-sets/{questionSetId}/ai-status",
					{
						params: {
							path: {
								questionSetId,
							},
						},
					},
				);

				if (!res.data?.isSuccess) {
					throw new Error("Fail to fetch AI generation status");
				}

				const status = res.data?.data?.status;

				if (status === "COMPLETED") {
					navigate(
						`/creation/question/team/${teamId}/question-set/${questionSetId}`,
						{
							replace: true,
						},
					);
				}

				if (status === "FAILED" || status === "NOT_FOUND") {
					throw new Error("AI generation failed");
				}
			} catch {
				notify.error("AI 문제 생성에 실패했습니다.");
				navigate(`/creation/new/team/${teamId}`, { replace: true });
			}
		};

		checkStatus();
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
				유씽씽이 만든 AI가 만든 문제 준비중
			</span>
		</div>
	);
};

export default CreationNewLoading;
