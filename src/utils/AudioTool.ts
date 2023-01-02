import Recorder from "js-audio-recorder";
const parameter = {
	sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
	sampleRate: 8000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
	numChannels: 1 // 声道，支持 1 或 2， 默认是1
};
let recorder: Recorder; // react刷新的时候,会把reacorder重置,暂时声明在组件外,
const audioObj = {
	video: false,
	audio: true
};
class AudioTool {
	constructor() {
		init();
	}
	stopClick = () => {
		recorder.stop();
		const playTime: number = recorder.getPlayTime();
		const wAVBlob: any = recorder.getWAVBlob();

		return { playTime, wAVBlob };
	};
	async startRecord() {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			try {
				const stream = await navigator.mediaDevices.getUserMedia(audioObj);
				if (stream.active) {
					recorder = new Recorder();
					recorder.start(); // 开始录音
				}
			} catch (err) {
				console.log(err);
			}
		} else {
			alert("没有麦克风配置");
		}
	}
}
// 指定参数

const init = () => {
	recorder = new Recorder(parameter);
};

export { recorder, AudioTool };
