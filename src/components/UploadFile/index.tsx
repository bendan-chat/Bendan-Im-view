import React, { useState } from "react";

import { UploadRequestOption } from "rc-upload/lib/interface";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, UploadFile, UploadProps } from "antd";
import { uploadTencentFile } from "@/api/modules/upload";
import { store } from "@/redux";

const { Dragger } = Upload;

export default function MyUploadFile() {
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const { userId } = store.getState().global.userInfo;

	const props: UploadProps = {
		name: "file",
		multiple: true,
		customRequest(options: UploadRequestOption<any>) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { action, data, file, filename, headers, onError, onProgress, onSuccess, withCredentials } = options;

			const formData = new FormData();
			formData.append("file", file);
			formData.append("userId", userId);
			formData.append("type", "");

			uploadTencentFile(formData)
				.then(({ data: response }) => {
					setTimeout(() => {
						//@ts-ignore
						onSuccess(response, file);
					});
				})
				.catch(onError);
		},
		onChange(info) {
			const { status } = info.file;
			if (status !== "uploading") {
				console.log(info.file, info.fileList);
			}
			if (status === "done") {
				message.success(`${info.file.name} file uploaded successfully.`);
			} else if (status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		onDrop(e) {
			console.log("Dropped files", e.dataTransfer.files);
		},
		beforeUpload: (file: UploadFile) => {
			setFileList([...fileList, file]);
			return false;
		},
		onRemove: (file: UploadFile) => {
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice();
			newFileList.splice(index, 1);
			setFileList(newFileList);
		}
	};
	return (
		<>
			<Dragger {...props}>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				<p className="ant-upload-text">点击上传/拖动上传</p>
				<p className="ant-upload-hint">Chrome 和 FireFox 支持拖拽到此区域上传，支持选择多个文件/文件夹 单个文件最大支持 512GB </p>
			</Dragger>
		</>
	);
}
