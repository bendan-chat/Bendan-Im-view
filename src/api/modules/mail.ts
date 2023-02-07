import { AdminServer } from "../config/servicePort";
import http from "@/api/config/ClientConfig";

/**
 * 发送验证码
 * @param useId
 * @param email
 * @returns
 */
export const sendMailCode = (useId: number, email: string) => {
	const params = {
		useId,
		email
	};
	return http.get(AdminServer.Mail + `/sendMailCode`, params, { headers: { noLoading: true } });
};

/**
 * 校验验证码
 * @param useId
 * @param email
 * @returns
 */
export const checkMailCode = (useId: number, mailCode: string) => {
	const params = {
		useId,
		mailCode
	};
	return http.get(AdminServer.Mail + `/checkMailCode`, params, { headers: { noLoading: true } });
};
