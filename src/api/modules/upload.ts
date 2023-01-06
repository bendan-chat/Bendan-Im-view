import { adminServer } from "../config/servicePort";
import http from "@/api/config/ClientConfig";

// * 上传文件
export const uploadTencentFile = async (upload: FormData) => {
	return http.post(`${adminServer.Upload}/uploadTencentFile`, upload, { headers: { "Content-Type": "multipart/form-data" } });
};

export const sttFile = async (upload: FormData) => {
	return http.post(`${adminServer.Stt}/asrFile`, upload, { headers: { "Content-Type": "multipart/form-data" } });
};
