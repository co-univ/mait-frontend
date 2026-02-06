import { Search } from "lucide-react";

//
//
//

const HeaderInfoSectionSearchInput = () => {
	/**
	 * Error Monitoring Test
	 */
	const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const inputElement = e.currentTarget.elements[0] as HTMLInputElement;
		const text = inputElement.value;

		if (text === "퀴리릭") {
			throw new Error("Quiriric");
		}
	};

	return (
		<form
			onSubmit={handleSumbit}
			className="flex h-5 w-[372px] items-center gap-[0.63rem] rounded-md bg-gray-5 px-padding-6 py-padding-3"
		>
			<Search className="h-2 w-2 text-gray-30" />
			<input
				className="w-full bg-transparent text-alpha-black100 outline-none typo-body-xsmall"
				type="text"
				placeholder="문제 검색"
			/>
		</form>
	);
};

export default HeaderInfoSectionSearchInput;
