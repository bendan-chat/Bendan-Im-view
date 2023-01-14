import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { store } from "@/redux";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { uploadTencentFile, sttFile } from "@/api/modules/upload";
import { Voice } from "@/utils/VoiceUtil";
import { MyTimer } from "@/utils/Timer";
import { Message } from "@/api/interface/chat";
import { sendMessage, SendMessageProps } from "@/websocket";
import { SendCode } from "@/websocket/type";

let voice: Voice;
// * 初始化 录音设备
const init = () => {
	voice = new Voice();
};
interface IProps {
	addMsgList: (msg: SendMessageProps) => void;
	toId: number;
	className: string;
}

function ChatAudioButton({ className, addMsgList, toId }: IProps) {
	const { userId } = store.getState().global.userInfo;
	const [audioBtu, setAudioBtu] = useState<string>("发送语音");
	const [sendAudio, setSendAudio] = useState<boolean>(false);
	const [myTimer] = useState<MyTimer>(new MyTimer());

	useEffect(() => {
		(async function fn() {
			init();
		})();
	}, []);

	// 上传语音
	const uploadAudio = (blob: Blob) => {
		const fileOfBlob = new File([blob], "2.wav");
		const formData = new FormData();
		formData.append("file", fileOfBlob);
		formData.append("userId", userId);
		formData.append("type", Message.MsgType.voiceMsg.toString());
		return uploadTencentFile(formData);
	};

	// 发送语音点击事件
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onAudioClick = async () => {
		if (!sendAudio) {
			// 发送语音
			setSendAudio(true);
			setAudioBtu("停止发送");
			myTimer.start();
			voice.startRecord();
		} else {
			setSendAudio(false);
			let voiceLen = Math.round(myTimer.stop());
			const wavBlob = voice.stopRecord();
			// 上传文件
			const { data } = await uploadAudio(wavBlob);
			handlerAudioMsg(voiceLen, data);
			setAudioBtu("发送语音");
		}
	};

	// 发送语音
	const handlerAudioMsg = (voiceLen: number, url: string) => {
		console.log("voiceLen", voiceLen);
		const msgObj: SendMessageProps = {
			code: SendCode.MESSAGE,
			sendType: Message.MsgType.voiceMsg,
			fromId: userId,
			toId: toId,
			sendContent: url,
			length: voiceLen
		};
		// 发送后台
		sendMessage(msgObj);
		// 发送前端
		addMsgList(msgObj);
	};
	useEffect(() => {
		let audios = sendAudio;
		setSendAudio(audios);
	}, [sendAudio]);
	const onMouseUp = () => {
		console.log("onMouseDown");
		setAudioBtu("发送语音");
		setSendAudio(false);
		const msgObj: SendMessageProps = {
			code: SendCode.MESSAGE,
			sendType: Message.MsgType.voiceMsg,
			fromId: userId,
			toId: toId,
			sendContent: "https://bendan-1305865318.cos.ap-guangzhou.myqcloud.com/1/6ba58aab-c431-4226-a55c-d5199675fbb7.wav",
			length: 13
		};
		addMsgList(msgObj);
	};
	const onMouseDown = () => {
		setSendAudio(true);
		setAudioBtu("停止发送");
		console.log("onMouseUp");
	};
	return (
		<div className={className}>
			<Button danger={sendAudio} onMouseUp={onMouseUp} onMouseDown={onMouseDown} type="primary" className="right-bottom-btn-Stop">
				{audioBtu}
			</Button>
			{/* <Button danger={sendAudio} onClick={onAudioClick} type="primary" className="right-bottom-btn-Stop">
				{audioBtu}
			</Button> */}
		</div>
	);
}

export default ChatAudioButton;
