import { ChevronDown } from "lucide-react";
import { useEffect, useId, useState } from "react";
import Button from "@/components/Button";
import { Dropdown } from "@/components/dropdown";
import { Field } from "@/components/field";
import Modal from "@/components/modal/Modal";
import { Radio } from "@/components/radio";
import { notify } from "@/components/Toast";
import useCopyQuestionSet from "@/hooks/useCopyQuestionSet";
import useTeams from "@/hooks/useTeams";
import type { QuestionSetSolveMode } from "@/libs/types";

//
//
//

interface QuestionSetCopyModalProps {
	open: boolean;
	questionSetId: number;
	questionSetTitle?: string;
	solveMode?: QuestionSetSolveMode;
	onClose: () => void;
}

//
//
//

const MAKER_ROLES = ["OWNER", "MAKER"];

//
//
//

const QuestionSetCopyModal = ({
	open,
	questionSetId,
	questionSetTitle,
	solveMode = "LIVE_TIME",
	onClose,
}: QuestionSetCopyModalProps) => {
	const titleInputId = useId();

	const { teams, activeTeam } = useTeams();
	const { isCopying, copyQuestionSet } = useCopyQuestionSet();

	const [title, setTitle] = useState("");
	const [targetTeamId, setTargetTeamId] = useState<number>();
	const [mode, setMode] = useState<QuestionSetSolveMode>(solveMode);

	/** Teams the user can create question sets in. */
	const copyableTeams =
		teams?.filter(
			(team) => team.teamType === "PERSONAL" || MAKER_ROLES.includes(team.role),
		) ?? [];

	/**
	 * Falls back to the personal workspace when the user only has PLAYER rights
	 * on the team they are currently viewing.
	 */
	const getDefaultTeamId = () => {
		if (
			activeTeam &&
			copyableTeams.some((team) => team.teamId === activeTeam.teamId)
		) {
			return activeTeam.teamId;
		}

		return copyableTeams.find((team) => team.teamType === "PERSONAL")?.teamId;
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: reset the form each time the modal opens
	useEffect(() => {
		if (!open) {
			return;
		}

		setTitle(`${questionSetTitle ?? ""} (1)`);
		setTargetTeamId(getDefaultTeamId());
		setMode(solveMode);
	}, [open]);

	const selectedTeam = copyableTeams.find(
		(team) => team.teamId === targetTeamId,
	);

	/**
	 *
	 */
	const handleCopyClick = async () => {
		if (!title.trim()) {
			notify.warn("문제 셋 제목을 입력해주세요.");
			return;
		}

		if (!targetTeamId) {
			notify.warn("복제할 팀을 선택해주세요.");
			return;
		}

		await copyQuestionSet({
			questionSetId,
			targetTeamId,
			title,
			solveMode: mode,
		});

		onClose();
	};

	/**
	 *
	 */
	const renderTitleField = () => {
		return (
			<Field.Root>
				<Field.Label htmlFor={titleInputId} className="typo-body-large">
					제목
				</Field.Label>
				<input
					id={titleInputId}
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="py-padding-6 px-padding-6 rounded-radius-medium1 border border-color-gray-60 typo-body-small focus:outline-none focus:border-color-primary-50"
				/>
			</Field.Root>
		);
	};

	/**
	 *
	 */
	const renderTeamField = () => {
		return (
			<Field.Root>
				<Field.Label className="typo-body-large">복제할 팀</Field.Label>
				<Dropdown.Root
					value={targetTeamId ? String(targetTeamId) : undefined}
					onValueChange={(value) => setTargetTeamId(Number(value))}
				>
					<Dropdown.Trigger
						placeholder="팀을 선택해주세요."
						icon={<ChevronDown size={20} />}
					>
						{selectedTeam?.teamName}
					</Dropdown.Trigger>
					<Dropdown.Content className="max-h-[240px] overflow-y-auto">
						{copyableTeams.map((team) => (
							<Dropdown.Item key={team.teamId} value={String(team.teamId)}>
								{team.teamName}
							</Dropdown.Item>
						))}
					</Dropdown.Content>
				</Dropdown.Root>
			</Field.Root>
		);
	};

	/**
	 *
	 */
	const renderModeField = () => {
		if (selectedTeam?.teamType === "PERSONAL") {
			return null;
		}

		return (
			<Field.Root>
				<Field.Label className="typo-body-large">모드</Field.Label>
				<Radio.Group
					value={mode}
					onChange={(value) => setMode(value as QuestionSetSolveMode)}
					className="bg-color-gray-5 flex items-center py-padding-10 px-padding-11 rounded-radius-medium1"
				>
					<Radio.Item value="LIVE_TIME" className="flex-1">
						<Radio.Input />
						<Radio.Label>실시간모드</Radio.Label>
					</Radio.Item>
					<Radio.Item value="STUDY" className="flex-1">
						<Radio.Input />
						<Radio.Label>학습모드</Radio.Label>
					</Radio.Item>
				</Radio.Group>
			</Field.Root>
		);
	};

	return (
		<Modal open={open} onClose={onClose}>
			<div className="w-[512px] flex flex-col gap-gap-8">
				<h2 className="typo-heading-medium">문제 셋 복제</h2>

				{renderTitleField()}
				{renderTeamField()}
				{renderModeField()}

				<p className="typo-body-small text-color-gray-40">
					복제된 문제 셋은 선택한 팀의 제작 중 목록으로 이동하며, 풀이 기록은
					복제되지 않습니다.
				</p>

				<div className="flex gap-gap-5 justify-end">
					<Button
						item="취소"
						onClick={onClose}
						className="py-padding-4 px-padding-8 typo-body-small"
					/>
					<Button
						variant="primary"
						disabled={isCopying}
						item={isCopying ? "복제 중..." : "복제하기"}
						onClick={handleCopyClick}
						className="py-padding-4 px-padding-8 typo-body-small"
					/>
				</div>
			</div>
		</Modal>
	);
};

export default QuestionSetCopyModal;
