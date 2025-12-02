import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "@/hooks/useUser";
import Loading from "@/pages/Loading";

//
//
//

interface AuthGuardProps {
	children: React.ReactNode;
}

//
//
//

const AuthGuard = ({ children }: AuthGuardProps) => {
	const { user, isLoading } = useUser();

	const navigate = useNavigate();

	//
	//
	//
	useEffect(() => {
		if (!isLoading && !user) {
			navigate("/");
		}
	}, [user, isLoading, navigate]);

	if (isLoading) {
		return <Loading />;
	}

	return <>{children}</>;
};

export default AuthGuard;
