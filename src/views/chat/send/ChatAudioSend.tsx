import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { store } from "@/redux";
import { useParams } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { uploadTencentFile, sttFile } from "@/api/modules/upload";
import { Voice } from "@/utils/VoiceUtil";
import { MyTimer } from "@/utils/Timer";
import { Message } from "@/api/interface/chat";

let voice: Voice;

// * 初始化 录音设备
const init = () => {
	voice = new Voice();
};

function ChatAudioSend() {
	const { userId } = store.getState().global.userInfo;
	const { id } = useParams();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const toId: number = Number.parseInt(id!);
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
	const sendAudioClick = async () => {
		if (!sendAudio) {
			// 发送语音
			setSendAudio(true);
			setAudioBtu("停止发送");
			myTimer.start();
			voice.startRecord();
		} else {
			// 停止发送语音
			setSendAudio(false);
			let voiceLen = myTimer.stop();
			console.log("voiceLen", Math.round(voiceLen));
			setAudioBtu("发送语音");
			const wavBlob = voice.stopRecord();
			// 上传文件
			let res = await uploadAudio(wavBlob);
			// 发送消息给用户
			// 前端展示
			console.log(res.data);
			// 发送消息
		}
	};
	return (
		<>
			<Button danger={sendAudio} onClick={sendAudioClick} type="primary" className="right-bottom-btn-Stop">
				{audioBtu}
			</Button>
		</>
	);
}

export default ChatAudioSend;
