import AdjustableTextarea, {
	type AdjustableTextareaProps,
} from "@/components/AdjustableTextarea";

//
//
//

interface CreationPanelTextareaProps extends AdjustableTextareaProps {}

//
//
//

const CreationPanelTextarea = (props: CreationPanelTextareaProps) => {
	return (
		<AdjustableTextarea
			minRows={3}
			className="!bg-color-gray-5 py-padding-10 px-padding-11 rounded-radius-medium1 typo-body-medium resize-none w-full outline-none"
			{...props}
		/>
	);
};

export default CreationPanelTextarea;
