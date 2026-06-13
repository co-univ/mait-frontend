interface DashboardHeaderProps {
	icon: React.ReactNode;
	title: string;
}

//
//
//

const DashboardHeader = ({ icon, title }: DashboardHeaderProps) => {
	return (
		<div className="flex items-center gap-gap-5 typo-heading-medium">
			{icon}
			<h2>{title}</h2>
		</div>
	);
};

export default DashboardHeader;
