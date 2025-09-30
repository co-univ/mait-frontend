import { useParams, useSearchParams } from "react-router-dom";
import { Tabs } from "@/components/Tabs";
import QuestionSetsCard from "@/domains/question-sets/components/common/QuestionSetsCard";
import QuestionSetsContentHeader from "@/domains/question-sets/components/common/QuestionSetsContentHeader";
import QuestionSetsTabs from "@/domains/question-sets/components/common/QuestionSetsTabs";
import QuestionSetsLayout from "@/domains/question-sets/layouts/common/QuestionSetsLayout";
import { apiHooks } from "@/libs/api";

//
//
//

enum MODE_MAP {
	making = "MAKING",
	review = "REVIEW",
	"live-time" = "LIVE_TIME",
}

//
//
//

const QuestionSets = () => {
	const teamId = Number(useParams().teamId);
	const [searchParams, setSearchParams] = useSearchParams();
	const mode = searchParams.get("mode") || "making";

	const { data } = apiHooks.useQuery("get", "/api/v1/question-sets", {
		params: {
			query: {
				teamId: teamId,
				mode: MODE_MAP[mode as keyof typeof MODE_MAP],
			},
		},
	});

	const questionSets = data?.data || [];

	console.log("questionSets", questionSets);

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
					<div>{/* <QuestionSetsCard /> */}</div>
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
					<div>{/* <QuestionSetsCard /> */}</div>
				</Tabs.Content>
			</Tabs.Root>
		</QuestionSetsLayout>
	);
};

export default QuestionSets;
