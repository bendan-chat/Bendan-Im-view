import { Login } from "@/api/interface/sys";
import { adminServer } from "@/api/config/servicePort";
import qs from "qs";
import http from "@/api/config/ClientConfig";
import { Base64 } from "js-base64";

const BasicAuth = () => {
	const clientId: string = "web";
	const clientSeret: string = "bendan";
	const base64Str = Base64.encode(clientId + ":" + clientSeret);
	const header: string = "Basic " + base64Str;
	return header;
};

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
	const header = BasicAuth();
	const config = {
		headers: {
			Authorization: header
		}
	};
	return http.post<Login.Res>(adminServer.User + `/login`, qs.stringify(params), config); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	// return http.post<Login.ResLogin>(PORT1 + `/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	// return http.post<Login.ResLogin>(PORT1 + `/login`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};
