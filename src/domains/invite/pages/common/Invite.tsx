import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { notify } from "@/components/Toast";
import { HOME_ROUTE_PATH } from "@/domains/home/home.routes";
import useUser from "@/hooks/useUser";
import { apiClient, apiHooks } from "@/libs/api";
import Loading from "@/pages/Loading";
import InviteExpiredLink from "./InviteExpiredLink";
import InviteNotApplied from "./InviteNotApplied";
import InviteNotLogin from "./InviteNotLogin";
import InvitePending from "./InvitePending";
import InviteRejected from "./InviteRejected";

//
//
//

const Invite = () => {
	const [isApplying, setIsApplying] = useState(false);

	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const code = searchParams.get("code");

	const { user, isLoading: isUserLoading } = useUser();

	const {
		data,
		error,
		isPending: isInviteInfoLoading,
		refetch,
	} = apiHooks.useQuery("get", "/api/v1/teams/invitation/info", {
		params: {
			query: {
				code: code ?? "",
			},
		},
	});

	const inviteInfo = data?.data;

	/**
	 *
	 */
	const handleApplyButtonClick = async () => {
		if (isApplying) {
			return;
		}

		setIsApplying(true);

		try {
			const res = await apiClient.POST("/api/v1/teams/{teamId}/applicant", {
				params: {
					path: {
						teamId: inviteInfo?.teamId ?? 0,
					},
					query: {
						code: code ?? "",
					},
				},
			});

			if (!res.data?.isSuccess) {
				throw new Error("Failed to apply for invitation");
			}

			if (res.data.data?.joinedImmediate) {
				navigate(HOME_ROUTE_PATH.ROOT);
			} else {
				refetch();
			}
		} catch {
			notify.error("초대 신청에 실패했어요. 다시 시도해주세요.");
		} finally {
			setIsApplying(false);
		}
	};

	//
	//
	//
	useEffect(() => {
		if (user && !isUserLoading) {
			refetch();
		}
	}, [user, isUserLoading, refetch]);

	//
	// Case: approved user
	//
	useEffect(() => {
		if (!error) {
			return;
		}

		const reason = (error as unknown as { reasons: string[] }).reasons[0] ?? "";

		if (reason === "ALREADY_MEMBER") {
			navigate(HOME_ROUTE_PATH.ROOT);
		}
	}, [error, navigate]);

	// Case: loading
	if (isUserLoading || isInviteInfoLoading) {
		return <Loading />;
	}

	// Case: no user info
	if (!user && inviteInfo) {
		return <InviteNotLogin teamName={inviteInfo.teamName} />;
	}

	if (user && inviteInfo) {
		// Case: not applied
		if (inviteInfo.applicationStatus === "NOT_APPLIED") {
			return (
				<InviteNotApplied
					isApplying={isApplying}
					teamName={inviteInfo.teamName}
					onClick={handleApplyButtonClick}
				/>
			);
		}

		// Case: pending
		if (inviteInfo.applicationStatus === "PENDING") {
			return <InvitePending />;
		}

		// Case: rejected
		if (inviteInfo.applicationStatus === "REJECTED") {
			return <InviteRejected />;
		}
	}

	if (user && error) {
		const reason = (error as { reasons: string[] }).reasons[0] ?? "";

		// case: expired or not found code
		if (reason === "NOT_FOUND_CODE" || reason === "EXPIRED_CODE") {
			return <InviteExpiredLink />;
		}
	}

	return null;
};

export default Invite;
