/* eslint-disable @typescript-eslint/no-unused-vars */
import { message, Upload, Button } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { uploadTencentFile } from "@/api/modules/upload";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { store } from "@/redux";
import { Message } from "@/api/interface/chat";
import { UploadOutlined } from "@ant-design/icons";

import "./UserDetails.less";
import ImgCrop from "antd-img-crop";
import { updateUser } from "@/api/modules/user";
import { setUserInfo } from "@/redux/modules/global/action";
interface IProps {
	setMyAvatar: (avatar: string) => void;
	setModalVisible: (modalVisible: boolean) => void;
}

export default function UploadAvatar({ setMyAvatar, setModalVisible }: IProps) {
	const { userId, nickName, username, email } = store.getState().global.userInfo;
	const props: UploadProps = {
		name: "file",
		showUploadList: false,
		onChange(info) {
			if (info.file.status !== "uploading") {
				console.log(info.file, info.fileList);
			}
			if (info.file.status === "done") {
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		async customRequest(options: UploadRequestOption<any>) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { action, data, file, filename, headers, onError, onProgress, onSuccess, withCredentials } = options;

			const formData = new FormData();
			formData.append("file", file);
			formData.append("userId", userId);
			formData.append("type", `${Message.MsgType.pictureMsg}`);
			uploadTencentFile(formData)
				.then(res => {
					if (res.success) {
						setModalVisible(false);
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
							}
						});
						//@ts-ignore
						onSuccess(file);
					}
				})
				.catch(onError);
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
			<ImgCrop rotate>
				<Upload {...props}>
					<Button type="primary" style={{ borderRadius: "8px" }} className="btn-down" icon={<UploadOutlined />}>
						上传头像
					</Button>
				</Upload>
			</ImgCrop>
		</>
	);
}
