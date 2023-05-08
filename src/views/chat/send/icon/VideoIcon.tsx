/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { VideoCameraTwoTone } from "@ant-design/icons";
import { Modal } from "antd";
import { store } from "@/redux";

interface IProps {
	toId: number;
}

export default function PhoneIcon({ toId }: IProps) {
	const [open, setOpen] = useState<boolean>(false);
	const { userId } = store.getState().global.userInfo;

	const phoneClick = () => {
		setOpen(true);
		const w = window.open("_black");
		let url = `${import.meta.env.VITE_VIDEO_URL}/webrtc/${userId}.html?toUser=${toId}`;
		w!.location.href = url;
	};
	return (
		<>
			<VideoCameraTwoTone onClick={phoneClick} className="video-right-icon" />
			{/* <Modal
				closable={false}
				footer={null}
				open={open}
				destroyOnClose={true}
				centered={true}
				width={500}
				onCancel={() => setOpen(false)}
			>
				<iframe
					src={`${import.meta.env.VITE_VIDEO_URL}/webrtc/${userId}.html?toUser=${toId}`}
					frameBorder="0"
					className="card full-iframe"
				></iframe>
			</Modal> */}
		</>
	);
}
