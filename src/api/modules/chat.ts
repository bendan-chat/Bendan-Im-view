import http from "@/api/config/ClientConfig";
import { ChatServer } from "../config/servicePort";
import { ReqPage, ResPage } from "../interface/sys";

// * 获取聊天记录
interface RecordPage extends ReqPage {
	userId: number;
}
export const listRecord = (params: RecordPage) => {
	return http.get<ResPage<any>>(ChatServer.Record + `/listRecord`, params);
};
