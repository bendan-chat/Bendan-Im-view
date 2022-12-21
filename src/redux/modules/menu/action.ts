import * as types from "@/redux/mutation-types";
import { Dispatch } from "react";
import { Menus } from "@/api/interface/menu";
import { getMenuList } from "@/api/modules/menu";

// * updateCollapse
export const updateCollapse = (isCollapse: boolean) => ({
	type: types.UPDATE_COLLAPSE,
	isCollapse
});

// * setMenuList
export const setMenuList = (menuList: Menu.MenuOptions[]) => ({
	type: types.SET_MENU_LIST,
	menuList
});

// ? 下面方法仅为测试使用，不参与任何功能开发
interface MenuProps {
	type: string;
	menuList: Menus.MenuParams[];
}
// * redux-thunk
export const getMenuListActionThunk = () => {
	return async (dispatch: Dispatch<MenuProps>) => {
		const res = await getMenuList();
		dispatch({
			type: types.SET_MENU_LIST,
			menuList: (res.data as Menus.MenuParams[]) ?? []
		});
	};
};

// * redux-promise《async/await》
export const getMenuListAction = async (): Promise<MenuProps> => {
	const res = await getMenuList();
	return {
		type: types.SET_MENU_LIST,
		menuList: res.data ? res.data : []
	};
};

// * redux-promise《.then/.catch》
export const getMenuListActionPromise = (): Promise<MenuProps> => {
	return getMenuList().then(res => {
		return {
			type: types.SET_MENU_LIST,
			menuList: res.data ? res.data : []
		};
	});
};
