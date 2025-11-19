/**
 * Global portal container manager
 * Ensures a single modal-portal container is created and shared across all Modal instances
 */

let portalContainer: HTMLElement | null = null;

export const getPortalContainer = (): HTMLElement => {
	if (!portalContainer) {
		portalContainer = document.getElementById("modal-portal");

		if (!portalContainer) {
			portalContainer = document.createElement("div");
			portalContainer.id = "modal-portal";
			document.body.appendChild(portalContainer);
		}
	}

	return portalContainer;
};
