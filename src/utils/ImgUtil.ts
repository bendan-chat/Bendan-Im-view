import type { RcFile } from "antd/es/upload/interface";

// 缩略图
export function getBase64(img: RcFile, callback: (url: string) => void) {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result as string));
	reader.readAsDataURL(img);
}
