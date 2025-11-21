interface InviteHeaderProps {
	isDefault?: boolean;
	title?: string;
}

//
//
//

const InviteHeader = ({ isDefault = false, title }: InviteHeaderProps) => {
	return (
		<h2 className="typo-heading-large">
			{isDefault ? (
				<>
					<b className="text-primary-50 font-lexend">MAIT</b> 초대 링크로
					접속하셨습니다!
				</>
			) : (
				title
			)}
		</h2>
	);
};

export default InviteHeader;
