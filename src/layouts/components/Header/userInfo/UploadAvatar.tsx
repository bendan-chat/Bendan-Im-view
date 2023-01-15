import React, { useState } from "react";
import type { UploadChangeParam } from "antd/es/upload";
import { message, Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { uploadTencentFile } from "@/api/modules/upload";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { getBase64 } from "@/utils/ImgUtil";
import { store } from "@/redux";
import { Message } from "@/api/interface/chat";

interface IProps {
	avatar: string;
}

// 上传前校验文件
const beforeUpload = (file: RcFile) => {
	const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
	if (!isJpgOrPng) {
		message.error("You can only upload JPG/PNG file!");
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error("Image must smaller than 2MB!");
	}
	return isLt2M;
};

export default function UploadAvatar({ avatar }: IProps) {
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>(avatar);
	const { userId } = store.getState().global.userInfo;

	const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
		if (info.file.status === "uploading") {
			setLoading(true);
			return;
		}
		if (info.file.status === "done") {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj as RcFile, url => {
				setLoading(false);
				setImageUrl(url);
			});
		}
	};

	const customRequest = async (options: UploadRequestOption<any>) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { action, data, file, filename, headers, onError, onProgress, onSuccess, withCredentials } = options;

		const formData = new FormData();
		formData.append("file", file);
		formData.append("userId", userId);
		formData.append("type", `${Message.MsgType.pictureMsg}`);

		uploadTencentFile(formData)
			.then(({ data: response }) => {
				setTimeout(() => {
					//@ts-ignore
					onSuccess(response, file);
				});
			})
			.catch(onError);
	};

	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	return (
		<Upload
			// {...uploadProps}
			// 文件查询的时候只显示 jpeg, .png
			accept={".jpeg, .png, .gif"}
			name="avatar"
			listType="picture-card"
			className="avatar-uploader"
			showUploadList={false}
			customRequest={customRequest}
			beforeUpload={beforeUpload}
			onChange={handleChange}
			maxCount={1}
		>
			{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: "100%" }} /> : uploadButton}
		</Upload>
	);
}
