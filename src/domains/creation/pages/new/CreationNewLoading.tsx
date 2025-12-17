import { useEffect } from "react";
import Lottie from "react-lottie";
import {
	useBeforeUnload,
	useBlocker,
	useNavigate,
	useParams,
} from "react-router-dom";
import logoSpin from "@/assets/lotties/mait-logo-spin.json";
import { useConfirm } from "@/components/confirm";
import { notify } from "@/components/Toast";
import { MANAGEMENT_ROUTE_PATH } from "@/domains/management/management.routes";
import { apiClient } from "@/libs/api";
import { createPath } from "@/utils/create-path";
import { CREATION_ROUTE_PATH } from "../../creation.routes";

//
//
//

const POLLING_INTERVAL = 10 * 1000;

const OPTIONS = {
	loop: true,
	autoplay: true,
	animationData: logoSpin,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};

//
//
//

const CreationNewLoading = () => {
	const questionSetId = Number(useParams().questionSetId);

	const navigate = useNavigate();

	const { confirm } = useConfirm();

	useBeforeUnload((e) => {
		e.preventDefault();
		e.returnValue = "";
	});

	const blocker = useBlocker(({ nextLocation }) => {
		return !nextLocation.state?.passBlocker;
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
			navigate(MANAGEMENT_ROUTE_PATH.ROOT, {
				replace: true,
				state: {
					passBlocker: true,
				},
			});
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
						createPath(CREATION_ROUTE_PATH.ROOT, {
							questionSetId: questionSetId,
						}),
						{
							replace: true,
							state: {
								passBlocker: true,
							},
						},
					);
				}

				if (status === "FAILED" || status === "NOT_FOUND") {
					throw new Error("AI generation failed");
				}
			} catch {
				notify.error("AI 문제 생성에 실패했습니다.");

				navigate(CREATION_ROUTE_PATH.NEW, {
					replace: true,
					state: {
						passBlocker: true,
					},
				});
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
		<div className="w-full h-full flex flex-col justify-center items-center gap-gap-9">
			<Lottie options={OPTIONS} width={150} height={150} />
			<h1 className="typo-heading-large text-center">
				AI가 요청하신 내용을 생성하고 있어요
			</h1>
			<span className="typo-body-large">
				잠시만 기다려주세요. 결과가 곧 표시될 거예요.
			</span>
			<div className="w-[512px] p-padding-6 rounded-radius-medium1 bg-color-primary-5 flex justify-center">
				<ul className="list-disc list-inside">
					<li className="typo-body-small text-color-primary-40 text-center">
						복잡할 요청일 경우 조금 더 시간이 걸릴 수 있어요.
					</li>
				</ul>
			</div>
		</div>
	);
};

export default CreationNewLoading;
