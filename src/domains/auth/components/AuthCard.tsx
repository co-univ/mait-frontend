interface AuthCardProps {
	title: string;
	children: React.ReactNode;
	className?: string;
}

const AuthCard = ({ title, children, className }: AuthCardProps) => {
	return (
		<div className="flex flex-col justify-center items-center gap-[2rem]">
			<h2 className="text-center font-paperlogy text-color-alpha-black100 font-bold text-[2rem]">
				{title}
			</h2>
			<div
				className={`w-full max-w-[449px] h-[545px] p-5 bg-color-alpha-white100 rounded-radius-medium1 flex flex-col justify-start gap-[2rem] ${className}`}
			>
				{children}
			</div>
		</div>
	);
};

export default AuthCard;
