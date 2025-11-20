import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { notify } from "@/components/Toast";
import useUser from "@/hooks/useUser";
import { apiClient, apiHooks } from "@/libs/api";
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
	const [joinedImmediate, setJoinedImmediate] = useState<boolean>();

	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const code = searchParams.get("code");

	const { user, isLoading: isUserLoading } = useUser();

	const { data, error, refetch } = apiHooks.useQuery(
		"get",
		"/api/v1/teams/invitation/info",
		{
			params: {
				query: {
					code: code ?? "",
				},
			},
		},
	);

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

			setJoinedImmediate(res.data.data?.joinedImmediate);
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
	// approved user
	//
	useEffect(() => {
		// biome-ignore lint/suspicious/noExplicitAny: error type is not defined
		if ((error && (error as any).code === "C-007") || joinedImmediate) {
			navigate("/");
		}
	}, [error, navigate, joinedImmediate]);

	if (isUserLoading) {
		return null;
	}

	// invalid link or expired link
	if (!code) {
		return <InviteExpiredLink />;
	}

	// not logged in user
	if (
		!user &&
		!isUserLoading &&
		inviteInfo?.applicationStatus === "NOT_APPLIED"
	) {
		return <InviteNotLogin teamName={inviteInfo.teamName} />;
	}

	// pending approval
	if (
		inviteInfo?.applicationStatus === "PENDING" ||
		joinedImmediate === false
	) {
		return <InvitePending />;
	}

	// not approved user
	if (inviteInfo?.applicationStatus === "NOT_APPLIED") {
		return (
			<InviteNotApplied
				isApplying={isApplying}
				teamName={inviteInfo.teamName}
				onClick={handleApplyButtonClick}
			/>
		);
	}

	return <div>로딩</div>;
};

export default Invite;
