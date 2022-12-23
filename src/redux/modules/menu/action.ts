import * as types from "@/redux/mutation-types";
// import { Dispatch } from "react";
// import { Menus } from "@/api/interface/menu";
// import { getMenuList } from "@/api/modules/menu";

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
