import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//
//
//

export const useScrollToHash = () => {
	const { hash } = useLocation();

	//
	useEffect(() => {
		if (!hash) {
			return;
		}

		const id = hash.replace("#", "");
		const element = document.getElementById(id);

		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
			return;
		}

		const observer = new MutationObserver((_, obs) => {
			const element = document.getElementById(id);

			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
				obs.disconnect();
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		return () => observer.disconnect();
	}, [hash]);
};
