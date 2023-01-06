import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { store } from "@/redux";
import { useParams } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { uploadTencentFile, sttFile } from "@/api/modules/upload";
import { Voice } from "@/utils/Audio";
import { MyTimer } from "@/utils/Timer";

let voice: Voice;

// * 初始化 录音设备
const init = () => {
	voice = new Voice();
};

function ChatAudioMsg() {
	const { userId } = store.getState().global.userInfo;
	const { id } = useParams();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const toId: number = Number.parseInt(id!);
	const [audioBtu, setAudioBtu] = useState<string>("发送语音");
	const [sendAudio, setSendAudio] = useState<boolean>(false);
	const [myTimer] = useState<MyTimer>(new MyTimer());
	// const [voice] = useState<Voice>(new Voice());

	useEffect(() => {
		(async function fn() {
			init();
		})();
	}, []);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const uploadWsAudio = (blob: Blob) => {
		const fileOfBlob = new File([blob], "voice.pcm");
		const formData = new FormData();
		formData.append("file", fileOfBlob);
		formData.append("userId", userId);
		formData.append("isVoice", "1");
		return uploadTencentFile(formData);
	};

	const sendAudioClick = async () => {
		if (!sendAudio) {
			setSendAudio(true);
			setAudioBtu("停止发送");
			myTimer.start();
			voice.startRecord();
			// startRecord();
			// 发送语音
		} else {
			setSendAudio(false);
			let voiceLen = myTimer.stop();
			console.log("voiceLen", voiceLen);
			setAudioBtu("发送语音");
			const res = voice.stopRecord();
			const url = window.URL.createObjectURL(res);
			let a = document.createElement("a");
			document.body.appendChild(a);
			// @ts-ignore
			a.style = "display: none";
			a.href = url;
			a.download = "sample.wav";
			a.click();
			window.URL.revokeObjectURL(url);
			// setUrl(url);
			// console.log(url);
			// 停止发送语音
			// const { pcmBlob } =
			// const pcmBlob = stopRecord();
			// const params = new FormData();
			// params.append("file", pcmBlob);
			// sttFile(params);
			// uploadWsAudio(pcmBlob);
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

export default ChatAudioMsg;
