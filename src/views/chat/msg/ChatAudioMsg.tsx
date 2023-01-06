import { Button } from "antd";
import React, { useEffect, useState } from "react";
// import Recorder from "js-audio-recorder";
import { store } from "@/redux";
import { useParams } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { uploadTencentFile, sttFile } from "@/api/modules/upload";
// import { AudioUtil } from "@/utils/AudioUtil";
import { Voice } from "@/utils/is/Audio";

// let recorder: Recorder; // react刷新的时候,会把reacorder重置,暂时声明在组件外
// let instance: AudioUtil;
let voice: Voice;

// * 初始化 录音设备
const init = () => {
	voice = new Voice();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// instance = AudioUtil.init();
	// const parameter = {
	// 	sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
	// 	sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
	// 	numChannels: 1 // 声道，支持 1 或 2， 默认是1
	// };
	// recorder = new Recorder(parameter);
};

// * 停止录音
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const stopRecord = () => {
// const wAVBlob: Blob = recorder.getPCMBlob();
// return { wAVBlob };
// };

// * 开始录音
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const startRecord = async () => {
// 	const audioObj = {
// 		video: false,
// 		audio: true
// 	};
// 	if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
// 		try {
// 			const stream = await navigator.mediaDevices.getUserMedia(audioObj);
// 			if (stream.active) {
// 				recorder = new Recorder();
// 				recorder.start(); // 开始录音
// 			}
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	} else {
// 		alert("没有麦克风配置");
// 	}
// };

function ChatAudioMsg() {
	const { userId } = store.getState().global.userInfo;
	const { id } = useParams();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const toId: number = Number.parseInt(id!);
	const [audioBtu, setAudioBtu] = useState<string>("发送语音");
	const [url, setUrl] = useState<string>("");
	const [sendAudio, setSendAudio] = useState<boolean>(false);
	// * 发送语音消息
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const uploadWsAudio = (blob: Blob) => {
		const fileOfBlob = new File([blob], "voice.pcm");
		const formData = new FormData();
		formData.append("file", fileOfBlob);
		formData.append("userId", userId);
		formData.append("isVoice", "1");
		return uploadTencentFile(formData);
	};
	useEffect(() => {
		(async function fn() {
			init();
		})();
	}, []);

	const sendAudioClick = async () => {
		if (!sendAudio) {
			setSendAudio(true);
			setAudioBtu("停止发送");
			voice.startRecord();
			// startRecord();
			// 发送语音
		} else {
			setSendAudio(false);
			setAudioBtu("发送语音");
			const res = voice.stopRecord();
			const url = window.URL.createObjectURL(res);
			setUrl(url);
			console.log(res);
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
			<audio src={url} autoPlay controls></audio>
			<Button danger={sendAudio} onClick={sendAudioClick} type="primary" className="right-bottom-btn-Stop">
				{audioBtu}
			</Button>
		</>
	);
}

export default ChatAudioMsg;
