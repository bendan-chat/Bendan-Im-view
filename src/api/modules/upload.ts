import { adminServer } from "../config/servicePort";
import http from "@/api/config/ClientConfig";

/**
 * 上传文件
 * @param file
 * @param userId
 *  */
export const uploadTencentFile = async (upload: FormData) => {
	return http.post<string>(`${adminServer.Upload}/uploadTencentFile`, upload, {
		headers: { "Content-Type": "multipart/form-data", noLoading: true }
	});
};

export const sttFile = async (upload: FormData) => {
	return http.post(`${adminServer.Stt}/asrFile`, upload, { headers: { "Content-Type": "multipart/form-data" } });
};
