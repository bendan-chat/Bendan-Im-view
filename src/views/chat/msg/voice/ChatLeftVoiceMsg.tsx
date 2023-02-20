import { Avatar, Card } from "antd";
import React, { useEffect, useState } from "react";
import staticLeft from "@/assets/images/voice/static_left.png";
import Left from "@/assets/images/voice/left.gif";
import { SyncOutlined, FontSizeOutlined } from "@ant-design/icons";
import { ChatProps } from "@/views/chat/interface/ChatProps";
import { asrText } from "@/api/modules/upload";

import "./ChatVoice.less";

export default function ChatLeftVoiceMsg({ msg, avatar, len }: ChatProps.VoiceProps) {
	const [iconHidden, setIconHidden] = useState<boolean>(true);
	const [asrState, setAsrState] = useState<boolean>(true);
	const [asrHidden, setAsrHidden] = useState<boolean>(true);
	const [turnText, setTurnText] = useState<string>("");

	let audio = new Audio(msg);

	/**
	 * 播放点击事件
	 */
	const playClick = () => {
		audio.addEventListener("ended", () => {
			setIconHidden(true);
		});
		audio.play().then(() => {
			setIconHidden(false);
		});
	};

	/**
	 * 自动沉底
	 */
	useEffect(() => {
		document.getElementsByClassName("message-container")[0].scrollTop =
			document.getElementsByClassName("message-container")[0].scrollHeight;
	}, [turnText]);

	/**
	 * 翻译点击事件
	 */
	const sttClick = () => {
		setAsrState(false);
		// asr请求
		asrText(msg!)
			.then(res => {
				if (res.success) {
					setTurnText(res.data);
				}
			})
			.finally(() => {
				setAsrState(true);
				setAsrHidden(false);
			});
	};
	return (
		<li>
			<div className="voice-le">
				<div className="voice-le-box-voice">
					<Avatar shape="square" src={avatar} />
					<div className="voice-le-message-box">
						<span onClick={playClick}>
							<img style={{ width: "20px" }} src={iconHidden ? staticLeft : Left}></img>
							{len + " s"}
						</span>
						<SyncOutlined className="voice-le-stt-icon" hidden={asrState} spin />
						<FontSizeOutlined className="voice-le-stt-icon" hidden={!asrState} onClick={sttClick} />
					</div>
				</div>
				<Card
					size="small"
					hidden={asrHidden}
					style={{
						marginLeft: "50px"
					}}
				>
					<span>{turnText}</span>
				</Card>
			</div>
		</li>
	);
}
