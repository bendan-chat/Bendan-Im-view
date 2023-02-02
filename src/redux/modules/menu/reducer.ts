import { AnyAction } from "redux";
import { MenuState } from "@/redux/interface";
import produce from "immer";
import * as types from "@/redux/mutation-types";

const menuState: MenuState = {
	isCollapse: false,
	menuList: [],
	menuIconKey: "11",
	listMatch: false
};

// menu reducer
const menu = (state: MenuState = menuState, action: AnyAction) =>
	produce(state, draftState => {
		switch (action.type) {
			case types.UPDATE_COLLAPSE:
				draftState.isCollapse = action.isCollapse;
				break;
			case types.SET_MENU_LIST:
				draftState.menuList = action.menuList;
				break;
			case types.SET_MENU_ICON_KEY:
				draftState.menuIconKey = action.menuIconKey;
				break;
			case types.SET_LIST_MATCH:
				draftState.listMatch = action.listMatch;
				break;
			default:
				return draftState;
		}
	});

export default menu;
