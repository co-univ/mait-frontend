import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingView from "@/components/LoadingView";
import { AUTH_ROUTE_PATH } from "../auth.routes";

//
//
//

const AuthOAuthSignUp = () => {
  const navigate = useNavigate();

  //
  useEffect(() => {
    navigate("/account/create");
  }, [navigate]);

	return (
		<>
			<LoadingView />
		</>
	);
};

export default AuthOAuthSignUp;
