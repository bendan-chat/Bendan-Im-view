/* eslint-disable @typescript-eslint/no-unused-vars */
import ChatBottomSend from "./send/ChatBottomSend";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { listRecord, RecordPage } from "@/api/modules/chat";
import { store } from "@/redux";
import { Spin } from "antd";

import ChatVideoRightMsg from "./msg/video/ChatVideoRightMsg";
import ChatVideoLeftMsg from "./msg/video/ChatVideoLeftMsg";
import ChatImageRightMsg from "./msg/image/ChatImageRightMsg";
import ChatImageLeftMsg from "./msg/image/ChatImageLeftMsg";
import ChatFileLeftMsg from "./msg/file/ChatFileLeftMsg";
import ChatFileRightMsg from "./msg/file/ChatFileRightMsg";
import ChatRightMsg from "./msg/str/ChatRightMsg";
import ChatLeftMsg from "./msg/str/ChatLeftMsg";
import ChatRightVoiceMsg from "./msg/voice/ChatRightVoiceMsg";
import ChatLeftVoiceMsg from "./msg/voice/ChatLeftVoiceMsg";

import { ws } from "@/websocket";
import { Chat, Message } from "@/api/interface/chat";
import { SendCode, SendMessageProps } from "@/websocket/type";

import "./index.less";

const ChatRoom = () => {
	const { avatar, userId } = store.getState().global.userInfo;
	const { toAvatar } = store.getState().chat;

	const { id } = useParams();
	const toId: number = Number.parseInt(id!);
	const [msgList, setMsgList] = useState<SendMessageProps[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

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
		setLoading(true);
		listRecord(params)
			.then(function (response) {
				const dataList = handlerListRecord(response.data.items);
				setMsgList(dataList);
			})
			.finally(() => {
				setLoading(false);
			});
		document.getElementsByClassName("message-container")[0].scrollTop =
			document.getElementsByClassName("message-container")[0].scrollHeight;
	}, [id]);

	// * 动态加载消息时候滚动条也要沉低
	useEffect(() => {
		document.getElementsByClassName("message-container")[0].scrollTop =
			document.getElementsByClassName("message-container")[0].scrollHeight;
	}, [msgList]);

	/**
	 * 把 RecordData[] ->  SendMessageProps[]
	 * @param items
	 * @returns
	 */
	const handlerListRecord = (items: Chat.RecordData[]) => {
		const smps: SendMessageProps[] = [];
		for (let i = 0; i < items.length; i++) {
			let item = items[i];
			const smp: SendMessageProps = {
				fromId: item.fromId,
				toId: item.toId,
				sendContent: item.sendContent,
				sendType: item.sendType as Message.SendType,
				length: item.length,
				code: SendCode.MESSAGE
			};
			smps.push(smp);
		}
		return smps;
	};

	// ws 接受消息
	ws!.onmessage = function (event) {
		handleMsg(event);
	};

	// * 处理WebSocket 消息
	const handleMsg = (event: MessageEvent<any>) => {
		const result = JSON.parse(event.data as string);
		console.log(result);
		// * 处理心跳
		if (result === 2) {
			console.log();
		} else if (result === 5) {
			location.reload();
		} else {
			addMsg(result);
		}
	};

	// * 页面新增消息
	const addMsg = (msg: SendMessageProps) => {
		const temp = [...msgList];
		temp.push(msg);
		setMsgList(temp);
	};

	const matchMsgType = (item: SendMessageProps, index: number) => {
		// * 0文本，1图片，2语音，3视频 , 4文件
		if (item.fromId === userId) {
			switch (item.sendType) {
				case 0:
					return <ChatRightMsg avatar={avatar} key={index} msg={item.sendContent!} />;
				case 1:
					return <ChatImageRightMsg avatar={avatar} key={index} msg={item.sendContent!} />;
				case 2:
					return <ChatRightVoiceMsg avatar={avatar} key={index} msg={item.sendContent!} len={item.length!} />;
				case 3:
					return <ChatVideoRightMsg avatar={avatar} key={index} msg={item.sendContent!} />;
				case 4:
					return <ChatFileRightMsg avatar={avatar} key={index} msg={item.sendContent!} size={item.length!} />;
				default:
					new Error("出现未知消息请检查数据库");
					break;
			}
		} else {
			switch (item.sendType) {
				case 0:
					return <ChatLeftMsg avatar={toAvatar} key={index} msg={item.sendContent!} />;
				case 1:
					return <ChatImageLeftMsg avatar={toAvatar} key={index} msg={item.sendContent!} />;
				case 2:
					return <ChatLeftVoiceMsg avatar={toAvatar} key={index} msg={item.sendContent!} len={item.length!} />;
				case 3:
					return <ChatVideoLeftMsg avatar={toAvatar} key={index} msg={item.sendContent!} />;
				case 4:
					return <ChatFileLeftMsg avatar={toAvatar} key={index} msg={item.sendContent!} size={item.length!} />;
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
					<Spin spinning={loading} tip="Loading" size="large" style={{ width: "100%" }}>
						<div>
							{msgList.map((item, index) => {
								return matchMsgType(item, index);
							})}
						</div>
					</Spin>
				</div>
				<div className="chatFooter">
					<ChatBottomSend addMsgList={addMsg} toId={toId} />
				</div>
			</div>
		</>
	);
};

export default ChatRoom;
