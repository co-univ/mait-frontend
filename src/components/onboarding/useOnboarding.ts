import React from "react";
import { apiHooks } from "@/libs/api";

//
//
//

type UseOnboardingProps = {};

//
//
//

const useOnboarding = () => {
	const { data, isPending } = apiHooks.useQuery(
		"get",
		"/api/v1/onboarding/screens/unviewed",
	);
	return;
};

export default useOnboarding;
