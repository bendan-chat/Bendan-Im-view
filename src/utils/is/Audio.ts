import { ResultEnum } from "@/enums/httpEnum";

enum status {
	success = ResultEnum.SUCCESS,
	error = ResultEnum.ERROR
}
export class Voice {
	public chunks: any[] = [];
	public mediaRecorder: MediaRecorder | undefined;
	//获取麦克风权限
	recorder() {
		return new Promise<{ code: status; msg: MediaStream }>((resolve, reject) => {
			window.navigator.mediaDevices
				.getUserMedia({
					audio: true
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

	async startRecord() {
		const { msg } = await this.recorder();
		this.mediaRecorder = new MediaRecorder(msg);
		this.mediaRecorder.start();
		console.log("录音中...");
		this.mediaRecorder.ondataavailable = e => {
			this.chunks.push(e.data);
		};
	}

	//停止录音
	stopRecord() {
		this.mediaRecorder!.stop();
		console.log("录音结束");
		const blob = new Blob(this.chunks, { type: "audio/ogg; codecs=opus" });
		return blob;
	}
}
