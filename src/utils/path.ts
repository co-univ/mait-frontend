/**
 * Checks if the first segment of the current path matches any of the candidate paths.
 * @param candidates - An array of candidate paths to check against.
 * @param currentPath - The current path to check.
 * @returns True if a match is found, false otherwise.
 */
export const hasFirstValidPath = (
	candidates: string[],
	currentPath: string,
) => {
	return candidates.some((path) => currentPath.includes(path));
};
