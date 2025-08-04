import React from "react";
import { notify } from "../../components/common/Toast";

const Dashboard = () => {
	return (
		<div className="text-alpha-black100 typo-heading-xlarge">
			풀이 결과 대시보드 페이지입니다. 풀이 결과 대시보드 페이지입니다.
			<button type="button" onClick={() => notify.success("토스트 테스트 성공!")}>토스트 띄우기</button>
		</div>
	);
};

export default Dashboard;
