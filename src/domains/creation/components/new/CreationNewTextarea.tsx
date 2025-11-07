import AdjustableTextarea, {
	type AdjustableTextareaProps,
} from "@/components/AdjustableTextarea";

//
//
//

interface CreationNewTextareaProps extends AdjustableTextareaProps {}

//
//
//

const CreationNewTextarea = (props: CreationNewTextareaProps) => {
	return (
		<AdjustableTextarea
			minRows={3}
			className="!bg-color-gray-5 py-padding-10 px-padding-11 rounded-radius-medium1 typo-body-medium resize-none w-full outline-none placeholder:text-color-gray-40"
			{...props}
		/>
	);
};

export default CreationNewTextarea;
