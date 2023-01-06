import { ResultEnum } from "@/enums/httpEnum";

enum status {
	success = ResultEnum.SUCCESS,
	error = ResultEnum.ERROR
}
// 左音道
let leftChannel: any[] = [];

// 右音道
let rightChannel: any[] = [];

let recordingLength = 0;
// 缓存容量
let bufferSize = 2048;

export class Voice {
	// 音频记录对象
	// public mediaRecorder: MediaRecorder | undefined;
	public mediaRecorder: ScriptProcessorNode | undefined;

	// 音频容器
	public context: AudioContext | undefined;

	// 采样率
	public sampleRate: number = 44100;

	// 音频流node
	public mediaStreamAudioSourceNode: MediaStreamAudioSourceNode | undefined;

	// 输入通道数
	public numberOfInputChannels = 2;

	// 输出通道数
	public numberOfOutputChannels = 2;

	// 录音长度
	public chunks: any[] = [];

	//获取麦克风权限
	recorder() {
		return new Promise<{ code: status; msg: MediaStream }>((resolve, reject) => {
			window.navigator.mediaDevices
				.getUserMedia({
					// audio: true
					audio: {
						sampleRate: 44100,
						channelCount: 2 // canary 中此设置未生效，始终为 2
					}
				})
				.then(mediaStream => {
					resolve({
						code: status.success,
						msg: mediaStream
					});
				})
				.catch(err => {
					reject({
						code: status.error,
						msg: err
					});
				});
		});
	}

	// 下载wav文件
	downloadWavFile(blob: Blob) {
		const url = window.URL.createObjectURL(blob);
		let a = document.createElement("a");
		document.body.appendChild(a);
		// @ts-ignore
		a.style = "display: none";
		a.href = url;
		a.download = "sample.wav";
		a.click();
		window.URL.revokeObjectURL(url);
	}

	// 开始录音
	async startRecord() {
		const { msg } = await this.recorder();
		// creates the audio context
		this.context = new window.AudioContext({ sampleRate: this.sampleRate });
		// creates the audio SourceNode
		this.mediaStreamAudioSourceNode = this.context.createMediaStreamSource(msg);
		// 创建一个jsNode
		this.mediaRecorder = this.createJSNode(this.context);

		//收集录音信息，大概0.09s调用一次
		this.mediaRecorder.onaudioprocess = function (e: any) {
			leftChannel.push(new Float32Array(e.inputBuffer.getChannelData(0)));
			rightChannel.push(new Float32Array(e.inputBuffer.getChannelData(1)));
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			recordingLength += bufferSize;
		};

		// we connect the recorder
		this.mediaStreamAudioSourceNode.connect(this.mediaRecorder);
		this.mediaRecorder.connect(this.context.destination);
	}

	//停止录音
	stopRecord() {
		// 停止录音记录
		this.mediaRecorder!.disconnect(this.context!.destination);
		this.mediaStreamAudioSourceNode!.disconnect(this.mediaRecorder!);

		// 将两个通道的数据压平
		// Float32Array[] => Float32Array
		let leftBuffer = this.flattenArray(leftChannel, recordingLength);
		let rightBuffer = this.flattenArray(rightChannel, recordingLength);
		// 交叉合并左右声道
		// [left[0],right[0],left[1],right[1],...]
		let voiceDatas = this.interleave(leftBuffer, rightBuffer);
		return this.createWavFile(voiceDatas);
	}

	//创建jsNode
	createJSNode(audioContext: AudioContext) {
		// createJavaScriptNode已被废弃
		//@ts-ignore
		let creator = audioContext.createScriptProcessor || audioContext.createJavaScriptNode;
		creator = creator.bind(audioContext);
		return creator(bufferSize, this.numberOfInputChannels, this.numberOfOutputChannels);
	}

	// 将两个通道的数据压平
	flattenArray(channelBuffer: any[], recordingLength: number) {
		let result = new Float32Array(recordingLength);
		let offset = 0;
		for (let i = 0; i < channelBuffer.length; i++) {
			let buffer = channelBuffer[i];
			result.set(buffer, offset);
			offset += buffer.length;
		}
		return result;
	}

	// 交叉合并左右声道
	interleave(leftChannel: Float32Array, rightChannel: Float32Array) {
		let length = leftChannel.length + rightChannel.length;
		let result = new Float32Array(length);

		let inputIndex = 0;

		// eslint-disable-next-line prettier/prettier
		for (let index = 0; index < length; ) {
			result[index++] = leftChannel[inputIndex];
			result[index++] = rightChannel[inputIndex];
			inputIndex++;
		}
		return result;
	}

	//将PCM数据转换成wav
	createWavFile(audioData: Float32Array) {
		const WAV_HEAD_SIZE = 44;
		// we create our wav file
		let buffer = new ArrayBuffer(WAV_HEAD_SIZE + audioData.length * 2);
		let view = new DataView(buffer);
		// RIFF chunk descriptor
		this.writeUTFBytes(view, 0, "RIFF");
		view.setUint32(4, 44 + audioData.length * 2, true);
		this.writeUTFBytes(view, 8, "WAVE");
		// FMT sub-chunk
		this.writeUTFBytes(view, 12, "fmt ");
		// chunkSize
		view.setUint32(16, 16, true);
		// wFormatTag
		view.setUint16(20, 1, true);
		// wChannels: stereo (2 channels)
		view.setUint16(22, 2, true);
		view.setUint32(24, 44100, true);
		view.setUint32(28, 44100 * 2, true);
		view.setUint16(32, 2 * 2, true);
		view.setUint16(34, 16, true);
		// data sub-chunk
		this.writeUTFBytes(view, 36, "data");
		view.setUint32(40, audioData.length * 2, true);

		// 写入PCM数据
		let length = audioData.length;
		let index = 44;
		let volume = 1;
		for (let i = 0; i < length; i++) {
			view.setInt16(index, audioData[i] * (0x7fff * volume), true);
			index += 2;
		}
		return new Blob([view], { type: "audio/wav" });
	}

	writeUTFBytes(view: DataView, offset: number, string: string) {
		let lng = string.length;
		for (let i = 0; i < lng; i++) {
			view.setUint8(offset + i, string.charCodeAt(i));
		}
	}
}
