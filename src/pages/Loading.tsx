//
//
//

const Loading = () => {
	return (
		<div className="w-full h-full flex flex-col justify-center items-center gap-gap-9">
			<h1 className="typo-heading-large text-center">
				데이터를 불러오고 있어요
				<br />
				잠시만 기다려주세요
			</h1>
			<span className="typo-body-large">
				원활한 연결을 위해 잠시 기다려 주시면 곧 완료돼요.
			</span>
		</div>
	);
};

export default Loading;
