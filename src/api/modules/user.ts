import { Users } from "@/api/interface/user";
import { adminServer } from "@/api/config/servicePort";
import http from "@/api/config/ClientConfig";

// * 获取菜单列表
export const pageUsers = () => {
	const params = {};
	return http.get<Users.test>(adminServer.Menu + `/listPage`, params);
};
