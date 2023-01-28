import { AdminServer } from "../config/servicePort";
import http from "@/api/config/ClientConfig";

/**
 * 上传文件
 * @param file
 * @param userId
 *  */
export const uploadTencentFile = async (upload: FormData) => {
	return http.post<string>(`${AdminServer.Upload}/uploadTencentFile`, upload, {
		headers: { "Content-Type": "multipart/form-data", noLoading: true }
	});
};

/**
 * 翻译
 * @param url
 */
interface AsrParam {
	url: string;
}
export const asrText = async (url: string) => {
	const param: AsrParam = {
		url: url
	};
	return http.get<string>(`${AdminServer.Asr}/turnText`, param, { headers: { noLoading: true } });
};
