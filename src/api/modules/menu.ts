import { Menus } from "@/api/interface/menu";
import { adminServer } from "@/api/config/servicePort";
import http from "@/api/config/ClientConfig";

// * 获取菜单列表
export const getMenuList = () => {
	const params = {
		roleIds: 1,
		isLazy: false
	};
	return http.get<Menus.MenuParams[]>(adminServer.Menu + `/treeByRoleIds`, params);
};

// * 获取按钮权限
export const getAuthorButtons = () => {
	return http.get<Menus.ResAuthButtons>(adminServer.Menu + `/auth/buttons`);
};
