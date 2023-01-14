export class DownloadUrl {
	/**
	 * 下载文件
	 * @param blob
	 */
	static downloadFile(blob: Blob) {
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

	/**
	 * 下载url
	 * @param url
	 */
	static downloadUrl(url: string) {
		let a = document.createElement("a");
		document.body.appendChild(a);
		// @ts-ignore
		a.style = "display: none";
		a.href = url;
		a.download = "sample.wav";
		a.click();
		window.URL.revokeObjectURL(url);
	}
}
