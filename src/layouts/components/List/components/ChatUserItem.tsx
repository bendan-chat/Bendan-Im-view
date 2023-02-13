/* eslint-disable @typescript-eslint/no-unused-vars */
import { Account } from "@/api/interface/user";
import { store } from "@/redux";
import { setToAvatar } from "@/redux/modules/chat/action";
import { splitUrlToFileName } from "@/utils/util";
import { Avatar, Badge } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface IProp {
	item: Account.ChatUser;
}

/**
 * 聊天消息处理
 * @param item
 */
function handlerLastMsg(lastMsgArg: string) {
	// * 0文本，1图片，2语音，3视频 , 4文件
	let msg: string;
	const msgTemp = splitUrlToFileName(lastMsgArg);
	let msgSplit = msgTemp.split(".");
	if (msgSplit.length == 1) {
		msg = "str";
	} else {
		msg = msgSplit[1];
	}
	switch (msg!) {
		case "str":
			return msgTemp.length > 10 ? msgTemp.substring(0, 10) + "......" : msgTemp;
		case "wav":
			return "[语音]";
		case "mp4":
			return "[视频]" + msgTemp;
		case "gif" || "png" || "jpg":
			return "[图片]" + msgTemp;
		default:
			return "[文件]" + msgTemp;
	}
}

export default function ChatUserItem({ item }: IProp) {
	const [selectId, setSelectId] = useState<number>();

	const navigate = useNavigate();

	function listItemClick() {
		navigate("/chat" + "/" + item.id);
		setSelectId(item.id);
		store.dispatch(setToAvatar(item.avatar as string));
		setSelectId(item.id);
	}
	return (
		<div className={`${selectId == item.id ? "click-active" : ""}`}>
			<div className="list-item" onClick={listItemClick}>
				<div className="list-item-img">
					<Avatar src={item.avatar} size="large" />
				</div>
				<div className="list-item-text">
					<div className="list-item-text-name">{item.nickName}</div>
					<div className="list-item-text-lastMsg">{handlerLastMsg(item.lastMsg)}</div>
				</div>
			</div>
		</div>
	);
}
