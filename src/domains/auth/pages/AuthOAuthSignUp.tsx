import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingView from "@/components/LoadingView";

//
//
//

const AuthOAuthSignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const authCode = searchParams.get("code");
    navigate("/account/create", { state: { code: authCode } });
  }, [location.search, navigate]);

  return (
    <>
      <LoadingView />
    </>
  );
};

export default AuthOAuthSignUp;

