import { motion } from "framer-motion";
import { useEffect } from "react";
import { useBeforeUnload, useNavigate, useParams } from "react-router-dom";
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

	//
	// prevent pop event(for back button) during loading
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

	//
	// polling for checking AI generation status
	// biome-ignore lint/correctness/useExhaustiveDependencies: confirm only needs to be defined on mount
	useEffect(() => {
		window.history.pushState(null, "", window.location.href);

		const handlePopState = () => {
			console.log("popstate triggered - back button pressed");
			// Push the state back to prevent navigation

			confirm(
				{
					title: "페이지를 벗어나시겠습니까?",
					description:
						"AI 문제 생성이 진행 중입니다. 페이지를 벗어나면 생성이 취소됩니다.",
				},
				() => {
					window.removeEventListener("popstate", handlePopState);

					navigate(`/creation/new/team/${teamId}`, { replace: true });
				},
				() => {
					window.history.pushState(null, "", window.location.href);
				},
			);

			window.history.pushState(null, "", window.location.href);
		};

		window.addEventListener("popstate", handlePopState);

		return () => {
			window.removeEventListener("popstate", handlePopState);
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
