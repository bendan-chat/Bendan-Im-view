/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { FolderTwoTone, UploadOutlined } from "@ant-design/icons";
import { message, Modal, UploadFile } from "antd";
import { sendMessage, SendMessageProps } from "@/websocket";
import MyUploadFile from "@/components/UploadFile";
import { store } from "@/redux";
import { RcFile } from "antd/es/upload";
import { uploadTencentFile } from "@/api/modules/upload";
import { SendCode } from "@/websocket/type";
import { matchFileSuffix } from "@/utils/util";

interface IProps {
	addMsgList: (msg: SendMessageProps) => void;
	toId: number;
}

export default function FileUploadIcon({ addMsgList, toId }: IProps) {
	const [myOpen, setMyOpen] = useState(false);
	const { userId } = store.getState().global.userInfo;
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [uploading, setUploading] = useState<boolean>(false);

	/**
	 * fileIcoon 点击事情
	 */
	const fileClick = () => {
		setMyOpen(true);
	};

	/**
	 * 弹窗 取消事情
	 */
	function handleCancel() {
		setMyOpen(false);
	}

	/**
	 * 上传文件处理事情
	 */
	function uploadOnok() {
		if (fileList.length > 0) {
			const formData = new FormData();
			const file = fileList[0] as RcFile;
			let size = file.size;
			let fileName = file.name;
			formData.append("file", file);
			formData.append("userId", userId);
			formData.append("type", "3");
			console.log(formData.get("file"));
			setUploading(true);
			uploadTencentFile(formData)
				.then(res => {
					const msgObj: SendMessageProps = {
						code: SendCode.MESSAGE,
						sendType: matchFileSuffix(fileName),
						fromId: userId,
						toId: toId,
						sendContent: res.data,
						length: size
					};
					// 发送前端
					addMsgList(msgObj);
					// 发送后台
					sendMessage(msgObj);
					//发送消息
				})
				.finally(() => {
					setFileList([]);
					setUploading(false);
					setMyOpen(false);
				});
		} else {
			message.warning("请选中上传的文件");
		}
	}

	return (
		<>
			<FolderTwoTone onClick={fileClick} className="file-left-icon" />
			<Modal
				transitionName=""
				maskTransitionName=""
				destroyOnClose={true}
				okButtonProps={{ loading: uploading }}
				okText={"上传"}
				cancelButtonProps={{
					style: {
						float: "left"
					}
				}}
				open={myOpen}
				centered={true}
				width={900}
				title={
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<UploadOutlined style={{ fontSize: 30, color: "#46a8fa" }} />
						<span style={{ marginRight: "400px" }}>上传文件</span>
					</div>
				}
				onCancel={handleCancel}
				onOk={uploadOnok}
			>
				<MyUploadFile fileList={fileList} setFileList={setFileList} />
			</Modal>
		</>
	);
}
