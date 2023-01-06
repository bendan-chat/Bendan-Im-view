import { Account } from "@/api/interface/user";
import type { SizeType } from "antd/lib/config-provider/SizeContext";

/* themeConfigProp */
export interface ThemeConfigProp {
	primary: string;
	isDark: boolean;
	weakOrGray: string;
	tabs: boolean;
	footer: boolean;
}

/* UserInfoConfigProp */
export interface UserInfoConfigProp {
	userId: number;
	username: string;
	avatar: string;
}

/* GlobalState */
export interface GlobalState {
	token: string;
	userInfo: any;
	assemblySize: SizeType;
	language: string;
	themeConfig: ThemeConfigProp;
}

/* MenuState */
export interface MenuState {
	isCollapse: boolean;
	menuList: Menu.MenuOptions[];
}

/* AuthState */
export interface AuthState {
	authButtons: {
		[propName: string]: any;
	};
	authRouter: string[];
}

/* friendState */
export interface FriendsState {
	friends: Account.ChatUser[];
}
