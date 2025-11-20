import { Check, Copy } from "lucide-react";
import { useState } from "react";
import Button from "@/components/Button";

//
//
//

interface CopyButtonProps {
	value: string;
}

//
//
//

const CopyButton = ({ value }: CopyButtonProps) => {
	const [isCopied, setIsCopied] = useState(false);

	/**
	 *
	 */
	const handleCopyLink = async () => {
		if (isCopied) {
			return;
		}

		await navigator.clipboard.writeText(value);

		setIsCopied(true);

		setTimeout(() => {
			setIsCopied(false);
		}, 3000);
	};

	return (
		<Button
			icon={isCopied ? <Check size={16} /> : <Copy size={16} />}
			onClick={handleCopyLink}
			className="border-none p-padding-2"
		/>
	);
};

export default CopyButton;
