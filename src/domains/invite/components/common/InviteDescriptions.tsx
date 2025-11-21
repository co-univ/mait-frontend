interface InviteDescriptionsProps {
	descriptions: string[];
}

//
//
//

const InviteDescriptions = ({ descriptions }: InviteDescriptionsProps) => {
	return (
		<div className="w-full p-padding-6 rounded-radius-medium1 bg-color-primary-5 flex justify-center">
			<ul className="list-disc list-inside">
				{descriptions.map((description, index) => (
					<li
						// biome-ignore lint/suspicious/noArrayIndexKey: li is static
						key={index}
						className="typo-body-small text-color-primary-40 text-center"
					>
						{description}
					</li>
				))}
			</ul>
		</div>
	);
};

export default InviteDescriptions;
