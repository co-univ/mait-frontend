import { useParams, useSearchParams } from "react-router-dom";
import QuestionSetsCard from "@/components/question-sets/QuestionSetsCard";
import QuestionSetsContentHeader from "@/components/question-sets/QuestionSetsContentHeader";
import QuestionSetsTabs from "@/components/question-sets/QuestionSetsTabs";
import { Tabs } from "@/components/tabs";
import useQuestionSets from "@/hooks/useQuestionSets";
import QuestionSetsLayout from "@/layouts/question-sets/QuestionSetsLayout";

//
//
//

const Management = () => {
	const teamId = Number(useParams().teamId);
	const [searchParams, setSearchParams] = useSearchParams();
	const mode = searchParams.get("mode") || "making";

	const { questionSets } = useQuestionSets({ teamId, mode });

	/**
	 *
	 */
	const handleModeChange = (value: string) => {
		const newParams = new URLSearchParams(searchParams);

		newParams.set("mode", value);

		setSearchParams(newParams);
	};

	return (
		<QuestionSetsLayout>
			<Tabs.Root
				value={mode}
				onValueChange={handleModeChange}
				className="flex flex-col gap-gap-11"
			>
				<QuestionSetsTabs />

				<QuestionSetsContentHeader label="제작 중" />

				<Tabs.Content value="making">
					<div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-gap-9">
						{questionSets.map((questionSet) => (
							<QuestionSetsCard
								key={questionSet.id}
								questionSet={questionSet}
							/>
						))}
					</div>
				</Tabs.Content>

				<Tabs.Content value="live-time">
					<div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-gap-9">
						{questionSets.map((questionSet) => (
							<QuestionSetsCard
								key={questionSet.id}
								questionSet={questionSet}
							/>
						))}
					</div>
				</Tabs.Content>

				<Tabs.Content value="review">
					<div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-gap-9">
						{questionSets.map((questionSet) => (
							<QuestionSetsCard
								key={questionSet.id}
								questionSet={questionSet}
							/>
						))}
					</div>
				</Tabs.Content>
			</Tabs.Root>
		</QuestionSetsLayout>
	);
};

export default Management;
