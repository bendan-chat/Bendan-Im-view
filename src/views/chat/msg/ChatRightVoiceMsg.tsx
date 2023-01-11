import { Avatar, Card } from "antd";
import React, { useState } from "react";
import staticRight from "@/assets/images/voice/static_right.png";
import right from "@/assets/images/voice/right.gif";
import { SyncOutlined, FontSizeOutlined } from "@ant-design/icons";
import sample from "@/assets/sample.wav";

interface IProps {
	src: string;
	len: number;
	avatar: string;
}

export default function ChatRightVoiceMsg({ src, avatar, len }: IProps) {
	const [iconHidden, setIconHidden] = useState<boolean>(true);
	const [sttState, setSttState] = useState<boolean>(true);
	const [sttText, setSttText] = useState<boolean>(true);
	let audio = new Audio(sample);

	// * 1 播放点击事件
	const playClick = () => {
		setIconHidden(false);
		playVoice();
	};
	// * 1.1 播放语音
	const playVoice = () => {
		console.log(src);
		audio.addEventListener("ended", () => {
			console.log("播放结束");
		});
		audio.play();
		// 模拟播放
		setTimeout(() => {
			setIconHidden(true);
		}, len * 1000);
	};

	// * 2 翻译点击事件
	const sttClick = () => {
		setSttState(false);
		// sst请求
		setTimeout(() => {
			setSttState(true);
			setSttText(false);
		}, len * 1000);
	};

	return (
		<>
			<div className="ri">
				<div className="ri-box">
					<div className="ri-message-box">
						<span onClick={playClick}>
							{len + " s"}
							<img style={{ width: "20px" }} src={iconHidden ? staticRight : right}></img>
						</span>
						<SyncOutlined className="ri-stt-icon" hidden={sttState} spin />
						<FontSizeOutlined className="ri-stt-icon" hidden={!sttState} onClick={sttClick} />
					</div>
					<Avatar shape="square" src={avatar} />
				</div>
				<Card
					size="small"
					hidden={sttText}
					style={{
						wordBreak: "break-all",
						borderRadius: "10px",
						marginRight: "50px",
						width: "auto",
						color: "#f8f8f8",
						background: "rgb(78 78 78)"
					}}
				>
					<span>鸡鸡鸡 蹦蹦蹦 鸡鸡鸡 蹦蹦蹦 鸡鸡鸡 蹦蹦蹦 鸡鸡鸡 蹦蹦蹦</span>
				</Card>
			</div>
		</>
	);
}
