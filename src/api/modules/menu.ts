import { Menus } from "@/api/interface/menu";
import { AdminServer } from "@/api/config/servicePort";
import http from "@/api/config/ClientConfig";

// * 获取菜单列表
export const getMenuList = () => {
	const params = {
		roleIds: 1,
		isLazy: false
	};
	return http.get<Menus.MenuParams[]>(AdminServer.Menu + `/treeByRoleIds`, params);
};
