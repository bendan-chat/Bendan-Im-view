import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { store } from "@/redux";
import { uploadTencentFile } from "@/api/modules/upload";
import { Message } from "@/api/interface/chat";
import { sendMessage, SendMessageProps } from "@/websocket";
import { SendCode } from "@/websocket/type";
import Recorder from "js-audio-recorder";

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
	const [uploadAudioing, setUploadAudioing] = useState<boolean>(false);
	useEffect(() => {
		let audios = sendAudio;
		setSendAudio(audios);
	}, [sendAudio]);

	/**
	 * 上传语音
	 * @param blob
	 * @returns
	 */
	const uploadAudio = (blob: Blob) => {
		const fileOfBlob = new File([blob], "voice.wav");
		const formData = new FormData();
		formData.append("file", fileOfBlob);
		formData.append("userId", userId);
		formData.append("type", Message.MsgType.voiceMsg.toString());
		return uploadTencentFile(formData);
	};

	/**
	 * 处理 上传后的语音
	 * @param voiceLen
	 * @param wavBlob
	 */
	const handlerAudioMsg = (voiceLen: number, wavBlob: Blob) => {
		if (voiceLen < 1) {
			message.warning("说话时间太短 ！");
			return;
		}
		setUploadAudioing(true);
		uploadAudio(wavBlob)
			.then(res => {
				const msgObj: SendMessageProps = {
					code: SendCode.MESSAGE,
					sendType: Message.MsgType.voiceMsg,
					fromId: userId,
					toId: toId,
					sendContent: res.data,
					length: voiceLen
				};
				// 发送前端
				addMsgList(msgObj);
				// 发送后台
				sendMessage(msgObj);
			})
			.finally(() => {
				setUploadAudioing(false);
			});
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
		// 向下取整
		let voiceLen = Math.floor(recorder.duration);
		handlerAudioMsg(voiceLen, wavBlob);
	};
	return (
		<div className={className}>
			<Button
				loading={uploadAudioing}
				danger={sendAudio}
				onMouseUp={onMouseUp}
				onMouseDown={onMouseDown}
				type="primary"
				className="right-bottom-btn-Stop"
			>
				{audioBtu}
			</Button>
		</div>
	);
}

export default ChatAudioButton;
