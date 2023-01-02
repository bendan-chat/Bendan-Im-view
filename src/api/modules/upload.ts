import axios from "axios";
import { Oss } from "../config/servicePort";

// * 获取上传文件
export const uploadFile = async (upload: FormData) => {
	try {
		// make axios post request
		const response = await axios({
			method: "post",
			// url: Oss.Upload + `/uploadFile`,
			url: import.meta.env.VITE_SERVER_URL + Oss.Upload + `/uploadFile`,
			data: upload,
			headers: { "Content-Type": "multipart/form-data" }
		});
		console.log(response.data);
	} catch (error) {
		console.log(error);
	}
};
