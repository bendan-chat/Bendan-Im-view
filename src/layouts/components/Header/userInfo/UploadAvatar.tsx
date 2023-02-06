/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import type { UploadChangeParam } from "antd/es/upload";
import { message, Upload, Modal } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { uploadTencentFile } from "@/api/modules/upload";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { store } from "@/redux";
import { Message } from "@/api/interface/chat";

import "./UserDetails.less";

// 上传前校验文件
const getBase64 = (file: RcFile): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error: any) => reject(error);
	});

interface IProps {
	fileList: UploadFile[];
	setFileList: (file: UploadFile[]) => void;
}

export default function UploadAvatar({ fileList, setFileList }: IProps) {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");

	/**
	 * 预览文件
	 * @param file
	 */
	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as RcFile);
		}
		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
		setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
	};

	/**
	 * 上传变化
	 */
	const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
		setFileList(newFileList);
	};

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);
	return (
		<>
			<Upload
				beforeUpload={(file: UploadFile) => {
					setFileList([...fileList, file]);
					return false;
				}}
				listType="picture-card"
				fileList={fileList}
				onPreview={handlePreview}
				onChange={handleChange}
			>
				{fileList.length >= 1 ? null : uploadButton}
			</Upload>
			<Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
				<img alt="example" style={{ width: "100%" }} src={previewImage} />
			</Modal>
		</>
	);
}
