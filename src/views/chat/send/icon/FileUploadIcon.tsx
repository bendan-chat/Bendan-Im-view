import React from "react";
import { FolderTwoTone } from "@ant-design/icons";
import { Modal } from "antd";

const fileClick = () => {
	Modal.confirm({
		title: "下载文件 🧡",
		centered: true,
		content: "当前操作会下载文件是否需要？",
		okText: "确认",
		cancelText: "取消",
		onOk: async () => {
			console.log();
		}
	});
};
export default function FileUploadIcon() {
	return (
		<div>
			<FolderTwoTone onClick={fileClick} className="file-left-icon" />
		</div>
	);
}
