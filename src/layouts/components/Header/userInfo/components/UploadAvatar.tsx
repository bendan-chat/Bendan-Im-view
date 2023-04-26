/* eslint-disable @typescript-eslint/no-unused-vars */
import { message, Upload, Button, Spin } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { uploadTencentFile } from "@/api/modules/upload";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { store } from "@/redux";
import { Message } from "@/api/interface/chat";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";

import "./UserDetails.less";
import ImgCrop from "antd-img-crop";
import { updateUser } from "@/api/modules/user";
import { setUserInfo } from "@/redux/modules/global/action";
import { useState } from "react";
interface IProps {
	setModalVisible: (modalVisible: boolean) => void;
}
export default function UploadAvatar({ setModalVisible }: IProps) {
	const { userId, nickName, username, email } = store.getState().global.userInfo;
	const [uploading, setUploading] = useState<boolean>(false);
	const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

	const props: UploadProps = {
		name: "file",
		showUploadList: false,
		onChange(info) {
			if (info.file.status !== "uploading") {
				console.log(info.file, info.fileList);
			}
			// eslint-disable-next-line no-empty
			if (info.file.status === "done") {
			} else if (info.file.status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		async customRequest(options: UploadRequestOption<any>) {
			const { action, data, file, filename, headers, onError, onProgress, onSuccess, withCredentials } = options;

			const formData = new FormData();
			formData.append("file", file);
			formData.append("userId", userId);
			formData.append("type", `${Message.MsgType.pictureMsg}`);
			setUploading(true);
			uploadTencentFile(formData)
				.then(res => {
					if (res.success) {
						let uploadAvatar = res.data;
						updateUser({
							id: userId,
							avatar: uploadAvatar,
							updateId: userId
						}).then(res => {
							if (res.success) {
								store.dispatch(
									setUserInfo({
										userId: userId,
										username: username,
										avatar: uploadAvatar,
										nickName: nickName,
										email: email
									})
								);
								setModalVisible(false);
								message.success("头像更新成功！！！");
							}
						});
						//@ts-ignore
						onSuccess(file);
					}
				})
				.catch(onError)
				.finally(() => {
					setUploading(false);
				});
		},
		async onPreview(file: UploadFile) {
			let src = file.url as string;
			if (!src) {
				src = await new Promise(resolve => {
					const reader = new FileReader();
					reader.readAsDataURL(file.originFileObj as RcFile);
					reader.onload = () => resolve(reader.result as string);
				});
			}
			const image = new Image();
			image.src = src;
			const imgWindow = window.open(src);
			imgWindow?.document.write(image.outerHTML);
		}
	};
	return (
		<>
			<ImgCrop modalTitle={"编辑头像"} rotate modalOk={"修改"} modalCancel={"取消"}>
				<Upload {...props}>
					<Button
						type="primary"
						disabled={uploading}
						style={{ borderRadius: "8px" }}
						className="btn-down"
						icon={uploading ? <Spin indicator={antIcon} /> : <UploadOutlined />}
					>
						上传头像
					</Button>
				</Upload>
			</ImgCrop>
		</>
	);
}
