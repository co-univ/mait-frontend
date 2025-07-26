import { LayoutDashboard, Puzzle, SquarePen, Users } from "lucide-react";
import type React from "react";
import { useState } from "react";
import SideBarNavigationMenuItem from "./SideBarNavigationMenuItem";

//
//
//

type MenuKey =
	| "quiz-management"
	| "quiz-solving"
	| "dashboard"
	| "team-management";

interface NavigationMenuItem {
	key: MenuKey;
	label: string;
	icon: (className: string) => React.ReactNode;
	path: string;
}

//
//
//

const MENU_LIST: Readonly<NavigationMenuItem[]> = Object.freeze([
	{
		key: "quiz-management",
		label: "문제 관리",
		icon: (className: string) => <SquarePen className={className} />,
		path: "/quiz-management",
	},
	{
		key: "quiz-solving",
		label: "문제 풀기",
		icon: (className: string) => <Puzzle className={className} />,
		path: "/quiz-solving",
	},
	{
		key: "dashboard",
		label: "풀이 결과 대시보드",
		icon: (className: string) => <LayoutDashboard className={className} />,
		path: "/dashboard",
	},
	{
		key: "team-management",
		label: "팀 관리",
		icon: (className: string) => <Users className={className} />,
		path: "/team-management",
	},
]);

//
//
//

const SideBarNavigationMenuList = () => {
	const [selected, setSelected] = useState<MenuKey | null>("quiz-management"); // maker면 문제 관리, player면 문제 풀기가 default

	return (
		<div className="flex flex-col w-full gap-[0.62rem]">
			{MENU_LIST.map((item) => (
				<SideBarNavigationMenuItem
					key={item.key}
					icon={item.icon}
					label={item.label}
					path={item.path}
					selected={selected === item.key}
					onSelect={() => setSelected(item.key)}
				/>
			))}
		</div>
	);
};

export default SideBarNavigationMenuList;
