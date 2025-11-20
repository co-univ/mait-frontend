"use client";

import { PencilLine } from "lucide-react";
import { useState } from "react";
import LoadingView from "@/components/LoadingView";
import { apiHooks } from "@/libs/api";
import MyPageButton from "../components/MyPageButton";
import MyPageInputBox from "../components/MyPageInputBox";

//
//
//

const MyPage = () => {
	const [isEditMode, setIsEditMode] = useState(false);
	const [editedNickname, setEditedNickname] = useState("");

	const { data: userInfo, isLoading } = apiHooks.useQuery(
		"get",
		"/api/v1/users/me",
	);

	const { mutate: updateNickname } = apiHooks.useMutation(
		"patch",
		"/api/v1/users/nickname",
		{
			onSuccess: () => {
				setIsEditMode(false);
			},
		},
	);

	/**
	 *
	 */
	const handleEditClick = () => {
		setIsEditMode(true);
		setEditedNickname(userInfo?.data?.nickname || "");
	};

	/**
	 *
	 */
	const getNicknameValue = () => {
		if (isEditMode) {
			return editedNickname;
		}
		return userInfo?.data?.nickname || "";
	};

	if (isLoading) {
		return <LoadingView />;
	}

	/**
	 *
	 */
	const handleCancelClick = () => {
		setIsEditMode(false);
		setEditedNickname("");
	};

	/**
	 *
	 */
	const handleSaveClick = () => {
		updateNickname({
			body: {
				nickname: editedNickname,
			},
		});
	};

	/**
	 *
	 */
	const renderActionButtons = () => {
		if (isEditMode) {
			return (
				<>
					<MyPageButton
						label="취소"
						onClick={handleCancelClick}
						variant="cancel"
					/>
					<MyPageButton
						label="저장"
						onClick={handleSaveClick}
						variant="primary"
					/>
				</>
			);
		}

		return <MyPageButton label="정보 수정" onClick={handleEditClick} />;
	};

	return (
		<div className="w-full h-full flex flex-col px-[120px] py-[30px]">
			<div className="flex flex-col gap-[2rem]">
				<div className="flex items-center gap-gap-5 w-full">
					<PencilLine />
					<h2 className="typo-heading-medium">마이페이지</h2>
				</div>
				<MyPageInputBox label="이메일" value={userInfo?.data?.email || ""} />
				<MyPageInputBox
					label="닉네임"
					value={getNicknameValue()}
					isEditable={isEditMode}
					autoFocus={isEditMode}
					onChange={setEditedNickname}
				/>
				<MyPageInputBox label="비밀번호" value="-" />
			</div>
			<div className="w-full flex justify-center gap-[20px] mt-auto mb-[54px]">
				{renderActionButtons()}
			</div>
		</div>
	);
};

export default MyPage;
