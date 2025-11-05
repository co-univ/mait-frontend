import { useParams, useSearchParams } from "react-router-dom";
import QuestionSetsTabs from "@/components/question-sets/QuestionSetsTabs";
import { Tabs } from "@/components/tabs";
import useQuestionSets from "@/hooks/useQuestionSets";
import QuestionSetsLayout from "@/layouts/question-sets/QuestionSetsLayout";
import ManagementLiveTime from "./ManagementLiveTime";
import ManagementMaking from "./ManagementMaking";

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

				<Tabs.Content value="making">
					<ManagementMaking questionSets={questionSets} />
				</Tabs.Content>

				<Tabs.Content value="live-time">
					<ManagementLiveTime questionSets={questionSets} />
				</Tabs.Content>

				<Tabs.Content value="review">
					<ManagementMaking questionSets={questionSets} />
				</Tabs.Content>
			</Tabs.Root>
		</QuestionSetsLayout>
	);
};

export default Management;
