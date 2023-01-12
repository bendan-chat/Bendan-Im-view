import ChatBottomSend from "./send/ChatBottomSend";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { listRecord, RecordData, RecordPage } from "@/api/modules/chat";
import { store } from "@/redux";

import ChatRightMsg from "./msg/str/ChatRightMsg";
import ChatLeftMsg from "./msg/str/ChatLeftMsg";
import { SendMessageProps, ws } from "@/websocket";
import { Message } from "@/api/interface/chat";
import { SendCode } from "@/websocket/type";
import ChatRightVoiceMsg from "./msg/voice/ChatRightVoiceMsg";
import ChatLeftVoiceMsg from "./msg/voice/ChatLeftVoiceMsg";

import ChatImageRightMsg from "./msg/image/ChatImageRightMsg";
import ChatImageLeftMsg from "./msg/image/ChatImageLeftMsg";

import "./chat.less";

const ChatRoom = () => {
	const { avatar } = store.getState().global.userInfo;
	const { userId } = store.getState().global.userInfo;
	const { toAvatar } = store.getState().chat;

	const { id } = useParams();
	const toId: number = Number.parseInt(id!);
	const [msgList, setMsgList] = useState<SendMessageProps[]>([]);

	// * 把 RecordData[] ->  SendMessageProps[]
	const handlerListRecord = (items: RecordData[]) => {
		const smps: SendMessageProps[] = [];
		for (let i = 0; i < items.length; i++) {
			let item = items[i];
			const smp: SendMessageProps = {
				fromId: item.fromId,
				toId: item.toId,
				sendContent: item.sendContent,
				sendType: item.sendType as Message.SendType,
				audioLen: item.audioLen,
				code: SendCode.MESSAGE
			};
			smps.push(smp);
		}
		return smps;
	};

	// * 加载聊天记录
	useEffect(() => {
		const params: RecordPage = {
			cur: 1,
			limit: 1000,
			orderField: "",
			order: false,
			userId: userId,
			toId: Number.parseInt(id!)
		};
		listRecord(params).then(function (response) {
			const dataList = handlerListRecord(response.data.items);
			setMsgList(dataList);
			document.getElementsByClassName("message-container")[0].scrollTop =
				document.getElementsByClassName("message-container")[0].scrollHeight;
		});
	}, [id]);

	// * 动态加载消息时候滚动条也要沉低
	useEffect(() => {
		document.getElementsByClassName("message-container")[0].scrollTop =
			document.getElementsByClassName("message-container")[0].scrollHeight;
	}, [msgList]);

	// ws 接受消息
	ws!.onmessage = function (event) {
		handleMsg(event);
	};

	// * 处理WebSocket 消息
	const handleMsg = (event: MessageEvent<any>) => {
		const result = JSON.parse(event.data as string);
		// * 处理心跳
		if (result === 2) {
			console.log();
		} else {
			addSelfMsg(result);
		}
	};

	// * 页面新增消息
	const addSelfMsg = (msg: SendMessageProps) => {
		const temp = [...msgList];
		temp.push(msg);
		setMsgList(temp);
	};

	const matchMsgType = (item: SendMessageProps, index: number) => {
		if (item.fromId === userId) {
			switch (item.sendType) {
				case 0:
					return <ChatRightMsg avatar={avatar} key={index} msg={item.sendContent!} />;
				case 1:
					return <ChatRightMsg avatar={avatar} key={index} msg={item.sendContent!} />;
				case 2:
					return <ChatRightVoiceMsg avatar={avatar} key={index} msg={item.sendContent!} len={item.audioLen!} />;
				case 3:
					return <ChatRightMsg avatar={avatar} key={index} msg={item.sendContent!} />;
				default:
					new Error("出现未知消息请检查数据库");
					break;
			}
		} else {
			switch (item.sendType) {
				case 0:
					return <ChatLeftMsg avatar={toAvatar} key={index} msg={item.sendContent!} />;
				case 1:
					return <ChatLeftMsg avatar={toAvatar} key={index} msg={item.sendContent!} />;
				case 2:
					return <ChatLeftVoiceMsg avatar={toAvatar} key={index} msg={item.sendContent!} len={item.audioLen!} />;
				case 3:
					return <ChatLeftMsg avatar={toAvatar} key={index} msg={item.sendContent!} />;
				default:
					new Error("出现未知消息请检查数据库");
					break;
			}
		}
	};

	return (
		<>
			<div className="cr">
				<div className="message-container">
					{msgList.map((item, index) => {
						return matchMsgType(item, index);
					})}
					<ChatImageLeftMsg msg="https://bendan-1305865318.cos.ap-guangzhou.myqcloud.com/1/1-21.jpg" avatar={toAvatar} />
					<ChatImageRightMsg msg="https://bendan-1305865318.cos.ap-guangzhou.myqcloud.com/1/1-21.jpg" avatar={avatar} />
				</div>
				<div className="chatFooter">
					<ChatBottomSend addMsgList={addSelfMsg} toId={toId} />
				</div>
			</div>
		</>
	);
};

export default ChatRoom;
