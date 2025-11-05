/**
 * Generate a temporary ID for creation entities
 * Combines timestamp with random number to reduce collision probability
 */
const creationQuestionGenerateId = (): number => {
	return Date.now() + Math.floor(Math.random() * 1000);
};

export default creationQuestionGenerateId;
