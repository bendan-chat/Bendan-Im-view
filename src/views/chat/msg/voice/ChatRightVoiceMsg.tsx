import { Avatar, Card } from "antd";
import { useState } from "react";
import staticRight from "@/assets/images/voice/static_right.png";
import right from "@/assets/images/voice/right.gif";
import { SyncOutlined, FontSizeOutlined } from "@ant-design/icons";
import { ChatProps } from "@/views/chat/interface/ChatProps";
import { asrText } from "@/api/modules/upload";

import "./ChatVoice.less";

export default function ChatRightVoiceMsg({ msg, avatar, len }: ChatProps.VoiceProps) {
	const [iconHidden, setIconHidden] = useState<boolean>(true);
	const [asrState, setAsrState] = useState<boolean>(true);
	const [asrHidden, setAsrHidden] = useState<boolean>(true);
	const [turnText, setTurnText] = useState<string>("");

	let audio = new Audio(msg);

	/**
	 * 播放点击事件
	 */
	const playClick = () => {
		setIconHidden(false);
		audio.addEventListener("ended", () => {
			console.log("播放结束");
		});
		audio.play().finally(() => {
			setIconHidden(true);
		});
	};

	/**
	 * 翻译点击事件
	 */
	const sttClick = () => {
		setAsrState(false);
		// asr请求
		asrText(msg!)
			.then(res => {
				setTurnText(res.data);
			})
			.finally(() => {
				setAsrState(true);
				setAsrHidden(false);
			});
	};

	return (
		<>
			<div className="voice-ri">
				<div className="voice-ri-box-voice">
					<div className="voice-ri-message-box">
						<span onClick={playClick}>
							{len + " s"}
							<img style={{ width: "20px" }} src={iconHidden ? staticRight : right}></img>
						</span>
						<SyncOutlined className="voice-ri-stt-icon" hidden={asrState} spin />
						<FontSizeOutlined className="voice-ri-stt-icon" hidden={!asrState} onClick={sttClick} />
					</div>
					<Avatar shape="square" src={avatar} />
				</div>
				<Card
					size="small"
					hidden={asrHidden}
					style={{
						wordBreak: "break-all",
						borderRadius: "10px",
						marginRight: "50px",
						width: "auto",
						color: "#f8f8f8",
						background: "rgb(78 78 78)"
					}}
				>
					<span>{turnText}</span>
				</Card>
			</div>
		</>
	);
}
