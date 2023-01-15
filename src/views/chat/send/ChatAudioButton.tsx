import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { store } from "@/redux";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { uploadTencentFile, sttFile } from "@/api/modules/upload";
import { Message } from "@/api/interface/chat";
import { sendMessage, SendMessageProps } from "@/websocket";
import { SendCode } from "@/websocket/type";
import Recorder from "js-audio-recorder";

// let voice: Voice;
// * 初始化 录音设备
// const init = () => {
// 	voice = new Voice();
// };
let recorder: Recorder;
interface IProps {
	addMsgList: (msg: SendMessageProps) => void;
	toId: number;
	className: string;
}

function ChatAudioButton({ className, addMsgList, toId }: IProps) {
	const { userId } = store.getState().global.userInfo;
	const [audioBtu, setAudioBtu] = useState<string>("发送语音");
	const [sendAudio, setSendAudio] = useState<boolean>(false);

	// 上传语音
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const uploadAudio = (blob: Blob) => {
		const fileOfBlob = new File([blob], "2.wav");
		const formData = new FormData();
		formData.append("file", fileOfBlob);
		formData.append("userId", userId);
		formData.append("type", Message.MsgType.voiceMsg.toString());
		return uploadTencentFile(formData);
	};
	useEffect(() => {
		let audios = sendAudio;
		setSendAudio(audios);
	}, [sendAudio]);

	/**
	 * 处理 上传后的语音
	 * @param voiceLen
	 * @param url
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handlerAudioMsg = (voiceLen: number, url: string) => {
		const msgObj: SendMessageProps = {
			code: SendCode.MESSAGE,
			sendType: Message.MsgType.voiceMsg,
			fromId: userId,
			toId: toId,
			sendContent: url,
			length: voiceLen
		};
		// 发送前端
		addMsgList(msgObj);
		// 发送后台
		sendMessage(msgObj);
	};

	/**
	 * 点击发送语音事件
	 */
	const onMouseDown = () => {
		recorder = new Recorder();
		recorder.start();
		setSendAudio(true);
		setAudioBtu("停止发送");
	};

	/**
	 * 松开发送语音 事情
	 */
	const onMouseUp = async () => {
		setAudioBtu("发送语音");
		setSendAudio(false);
		const wavBlob = recorder.getWAVBlob();
		let voiceLen = recorder.duration;
		console.log(recorder.duration);
		const msgObj: SendMessageProps = {
			code: SendCode.MESSAGE,
			sendType: Message.MsgType.voiceMsg,
			fromId: userId,
			toId: toId,
			sendContent: "https://bendan-1305865318.cos.ap-guangzhou.myqcloud.com/1/6ba58aab-c431-4226-a55c-d5199675fbb7.wav",
			length: voiceLen
		};
		addMsgList(msgObj);
		const { data } = await uploadAudio(wavBlob);
		handlerAudioMsg(voiceLen, data);
	};
	return (
		<div className={className}>
			<Button danger={sendAudio} onMouseUp={onMouseUp} onMouseDown={onMouseDown} type="primary" className="right-bottom-btn-Stop">
				{audioBtu}
			</Button>
		</div>
	);
}

export default ChatAudioButton;
