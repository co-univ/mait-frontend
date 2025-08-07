/** biome-ignore-all lint/nursery/useUniqueElementIds: ex */
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import useLoginModalOpenStore from "src/stores/useLoginModalOpenStore";
import { useLogin } from "../../hooks/useAuth";

interface LoginModalProps {
	open: boolean;
	onClose: () => void;
}

const LoginModal = ({ open, onClose }: LoginModalProps) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
		null,
	);

	const loginMutation = useLogin();
	const { handleLoginSuccess } = useLoginModalOpenStore();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email.trim() || !password.trim()) {
			alert("이메일과 비밀번호를 입력해주세요.");
			return;
		}

		try {
			await loginMutation.mutateAsync({ email, password });
			handleLoginSuccess();
			setEmail("");
			setPassword("");
		} catch (error) {
			console.error("로그인 실패:", error);
			alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
		}
	};

	const handleClose = () => {
		setEmail("");
		setPassword("");
		onClose();
	};

	// 백드롭 클릭시 모달 닫기
	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			handleClose();
		}
	};

	// Portal container 설정
	useEffect(() => {
		let container = document.getElementById("modal-portal");
		if (!container) {
			container = document.createElement("div");
			container.id = "modal-portal";
			document.body.appendChild(container);
		}
		setPortalContainer(container);

		return () => {
			// 컴포넌트 언마운트시 컨테이너가 비어있다면 제거
			if (container && container.children.length === 0) {
				document.body.removeChild(container);
			}
		};
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: event listeners should be added only once
	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape" && open) {
				handleClose();
			}
		};

		if (open) {
			document.addEventListener("keydown", handleEscapeKey);
			// 모달이 열릴 때 body 스크롤 방지
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscapeKey);
			// 모달이 닫힐 때 body 스크롤 복원
			document.body.style.overflow = "unset";
		};
	}, [open]);

	if (!open || !portalContainer) {
		return null;
	}

	const modalContent = (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
			onClick={handleBackdropClick}
		>
			<div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
				{/* Header */}
				<div className="mb-6 flex items-center justify-between">
					<h2 className="text-xl font-bold text-gray-900">로그인</h2>
					<button
						type="button"
						onClick={handleClose}
						className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
					>
						<X size={20} />
					</button>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							이메일
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="이메일을 입력하세요"
							className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-alpha-black100"
							disabled={loginMutation.isPending}
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							비밀번호
						</label>
						<div className="relative">
							<input
								id="password"
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="비밀번호를 입력하세요"
								className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-alpha-black100"
								disabled={loginMutation.isPending}
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
							>
								{showPassword ? "숨기기" : "보기"}
							</button>
						</div>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						disabled={
							loginMutation.isPending || !email.trim() || !password.trim()
						}
						className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{loginMutation.isPending ? "로그인 중..." : "로그인"}
					</button>
				</form>
			</div>
		</div>
	);

	return createPortal(modalContent, portalContainer);
};

export default LoginModal;
