import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "@/hooks/useUser";
import Loading from "@/pages/Loading";

//
//
//

interface PublicOnlyGuardProps {
	children: React.ReactNode;
}

//
//
//

const PublicOnlyGuard = ({ children }: PublicOnlyGuardProps) => {
	const { user, isLoading } = useUser();

	const navigate = useNavigate();

	//
	//
	//
	useEffect(() => {
		if (!isLoading && user) {
			navigate("/");
		}
	}, [user, isLoading, navigate]);

	if (isLoading) {
		return <Loading />;
	}

	return <>{children}</>;
};

export default PublicOnlyGuard;
