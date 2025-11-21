import { useQueryClient } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Button from "@/components/Button";
import { Dropdown } from "@/components/dropdown";
import { getPortalContainer } from "@/components/modal/portal";
import { Radio } from "@/components/radio";
import { notify } from "@/components/Toast";
import useTeams from "@/hooks/useTeams";
import { apiClient, apiHooks } from "@/libs/api";
import type { UserInfoApiResponse } from "@/libs/types";

//
//
//

interface TeamManagementAccountAddCardProps {
	open: boolean;
	onClose: () => void;
	anchorEl: HTMLElement | null;
}

//
//
//

const TeamManagementAccountAddCard = ({
	open,
	onClose,
	anchorEl,
}: TeamManagementAccountAddCardProps) => {
	const [email, setEmail] = useState("");
	const [role, setRole] = useState<"MAKER" | "PLAYER">("MAKER");

	const [isInviting, setIsInviting] = useState(false);

	const [searchResults, setSearchResults] = useState<UserInfoApiResponse[]>([]);
	const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

	const { activeTeam, refetch: refetchTeams } = useTeams();
	const queryClient = useQueryClient();

	/**
	 * Search users by email
	 */
	const searchUsersByEmail = async (searchEmail: string) => {
		if (!searchEmail || !searchEmail.includes("@")) {
			setSearchResults([]);
			return;
		}

		try {
			const res = await apiClient.GET("/api/v1/users/find-by-email/{email}", {
				params: {
					path: {
						email: searchEmail,
					},
				},
			});

			if (!res.data?.isSuccess) {
				throw new Error("User search failed");
			}

			setSearchResults(res.data.data ?? []);
		} catch {
			notify.error("사용자 검색에 실패했습니다.");
			setSearchResults([]);
		}
	};

	/**
	 * Handle email input change
	 */
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		setSelectedUserId(null);
	};

	/**
	 * Handle role dropdown change
	 */
	const handleRoleChange = (value: string) => {
		setRole(value as "MAKER" | "PLAYER");
	};

	/**
	 * Handle user selection from search results
	 */
	const handleUserSelect = (userId: string) => {
		setSelectedUserId(Number(userId));
	};

	/**
	 * Invite selected user to team
	 */
	const handleInvite = async () => {
		if (!selectedUserId) {
			notify.error("초대할 사용자를 선택해주세요.");
			return;
		}

		if (!activeTeam?.teamId) {
			notify.error("팀 정보를 불러올 수 없습니다.");
			return;
		}

		if (isInviting) {
			return;
		}

		try {
			setIsInviting(true);

			const res = await apiClient.POST("/api/v1/teams/{teamId}/team-users", {
				params: {
					path: {
						teamId: activeTeam.teamId,
					},
				},
				body: {
					userId: selectedUserId,
					role,
				},
			});

			if (!res.data?.isSuccess) {
				throw new Error("User invitation failed");
			}

			notify.info("사용자를 팀에 추가했습니다.");
			refetchTeams();

			// Invalidate team users query cache
			queryClient.invalidateQueries({
				queryKey: apiHooks.queryOptions("get", "/api/v1/teams/{teamId}/users", {
					params: {
						path: {
							teamId: activeTeam.teamId,
						},
					},
				}).queryKey,
			});

			// Reset state and close
			setEmail("");
			setSearchResults([]);
			setSelectedUserId(null);
			onClose();
		} catch {
			notify.error("사용자 초대에 실패했습니다.");
		} finally {
			setIsInviting(false);
		}
	};

	//
	// Debounce email input changes for search
	// biome-ignore lint/correctness/useExhaustiveDependencies: searchUsersByEmail is function defined inside component
	useEffect(() => {
		if (!open) return;

		const debounceTimer = setTimeout(() => {
			searchUsersByEmail(email);
		}, 500);

		return () => clearTimeout(debounceTimer);
	}, [email, open]);

	if (!open || !anchorEl) {
		return null;
	}

	const portalContainer = getPortalContainer();

	/**
	 *
	 */
	const handleBackdropClick = () => {
		onClose();
	};

	/**
	 *
	 */
	const getCardPosition = () => {
		const rect = anchorEl.getBoundingClientRect();
		return {
			top: rect.bottom + 10,
			right: window.innerWidth - rect.right,
			width: 480,
		};
	};

	/**
	 * Render email input and invite button section
	 */
	const renderInviteSection = () => {
		return (
			<div className="flex items-center gap-gap-5 w-full">
				<div className="w-full flex justify-between border border-color-gray-20 rounded-radius-medium1 px-padding-6 py-padding-4 ">
					<input
						type="text"
						value={email}
						onChange={handleEmailChange}
						placeholder="이메일로 사용자 검색"
						className="w-full typo-body-small outline-none"
					/>
					<div className="w-[120px]">
						<Dropdown.Root value={role} onValueChange={handleRoleChange}>
							<Dropdown.Trigger
								icon={<ChevronDown size={20} />}
								className="!px-padding-6 !py-padding-4 !mb-0 typo-body-xsmall text-color-gray-60 bg-color-gray-5 border-none"
							>
								{role === "MAKER" ? "메이커" : "플레이어"}
							</Dropdown.Trigger>
							<Dropdown.Content>
								<Dropdown.Item value="MAKER">메이커</Dropdown.Item>
								<Dropdown.Item value="PLAYER">플레이어</Dropdown.Item>
							</Dropdown.Content>
						</Dropdown.Root>
					</div>
				</div>

				<div className="w-[57px]">
					<Button
						item="초대"
						onClick={handleInvite}
						disabled={!selectedUserId || isInviting}
						className="!px-padding-6 !py-padding-4 border-none bg-color-primary-50 text-alpha-white100 typo-body-xsmall"
					/>
				</div>
			</div>
		);
	};

	/**
	 * Render user search results
	 */
	const renderUserList = () => {
		if (searchResults.length === 0) {
			return null;
		}

		return (
			<>
				<div className="flex flex-col">
					<Radio.Group
						value={selectedUserId?.toString() ?? ""}
						onChange={handleUserSelect}
					>
						{searchResults.map((user) => (
							<Radio.Item
								key={user.id}
								value={user.id?.toString() ?? ""}
								className="flex items-center justify-between py-padding-4"
							>
								<div className="flex flex-col gap-gap-2">
									<p className="typo-body-small text-color-alpha-black100">
										{user.name}({user.nickname})
									</p>
									<p className="typo-body-small text-color-gray-50">
										{user.email}
									</p>
								</div>
								<Radio.Input />
							</Radio.Item>
						))}
					</Radio.Group>
				</div>
			</>
		);
	};

	const position = getCardPosition();

	const cardContent = (
		<>
			<div
				className="fixed inset-0 z-40"
				onClick={handleBackdropClick}
				aria-hidden="true"
			/>
			<div
				className="fixed z-50 bg-alpha-white100 border border-color-gray-10 rounded-radius-xlarge1 flex flex-col"
				style={{
					top: `${position.top}px`,
					right: `${position.right}px`,
					width: `${position.width}px`,
				}}
			>
				<div className="px-padding-11 pt-padding-8">
					{renderInviteSection()}
				</div>
				<div className="w-full border-t border-color-gray-10 my-padding-8" />
				<div className="pb-padding-8 px-padding-11">{renderUserList()}</div>
			</div>
		</>
	);

	return createPortal(cardContent, portalContainer);
};

export default TeamManagementAccountAddCard;
