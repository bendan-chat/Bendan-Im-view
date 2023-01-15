import React, { useState } from "react";
import { FolderTwoTone, UploadOutlined } from "@ant-design/icons";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, Modal } from "antd";
import MyUploadFile from "@/components/UploadFile";

export default function FileUploadIcon() {
	const [myOpen, setMyOpen] = useState(false);
	const fileClick = () => {
		setMyOpen(true);
	};
	function handleCancel() {
		setMyOpen(false);
	}
	return (
		<>
			<FolderTwoTone onClick={fileClick} className="file-left-icon" />
			<Modal
				transitionName=""
				maskTransitionName=""
				destroyOnClose={true}
				okText="上传"
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
				// onOk={}
			>
				<MyUploadFile />
			</Modal>
		</>
	);
}
