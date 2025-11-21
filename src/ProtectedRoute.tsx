import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "./hooks/useUser";

//
//
//

interface ProtectedRouteProps {
	children: React.ReactNode;
}

//
//
//

const PublicOnlyRoute = ({ children }: ProtectedRouteProps) => {
	const { user } = useUser();
	const navigate = useNavigate();

	// 로그인한 유저는 기존 페이지로 리다이렉트
	useEffect(() => {
		if (user) {
			navigate(-1);
		}
	}, [user, navigate]);

	if (user) {
		return null;
	}

	return <>{children}</>;
};

//
//
//

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { user } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [user, navigate]);

	if (!user) {
		return null;
	}

	return <>{children}</>;
};

export { PublicOnlyRoute, ProtectedRoute };
export default PublicOnlyRoute;
