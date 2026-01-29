import React from "react";
import { apiClient } from "@/libs/api";

//
//
//

const MyPageLogoutButton = () => {
	/**
	 *
	 */
	const handleButtonClick = async () => {
		try {
			const res = await apiClient.POST("/api/v1/auth/logout", {} as any);
			console.log(res);
			if (res.data?.isSuccess) {
				localStorage.removeItem("token");
				window.location.href = "/";
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<button type="button" onClick={handleButtonClick}>
			<p className="typo-body-xsmall text-color-gray-50 underline">로그아웃</p>
		</button>
	);
};

export default MyPageLogoutButton;
