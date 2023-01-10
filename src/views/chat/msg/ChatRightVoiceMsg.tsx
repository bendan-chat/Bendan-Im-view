// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Avatar, Card } from "antd";
import React, { useEffect, useState } from "react";
import staticRight from "@/assets/images/voice/static_right.png";
import right from "@/assets/images/voice/right.gif";
import { FileSearchOutlined, SyncOutlined } from "@ant-design/icons";
// import sample from "@/assets/sample.wav";

interface IProps {
	src: string;
	len: number;
	avatar: string;
}

export default function ChatRightVoiceMsg({ src, avatar, len }: IProps) {
	const [iconHidden, setIconHidden] = useState<boolean>(true);
	const [sttState, setSttState] = useState<boolean>(true);
	// const [sttText, setSttText] = useState<boolean>(true);
	// const [play, setPlay] = useState<boolean>(false);
	// const [voiceLen, setVoiceLen] = useState<number>(len);

	// * 播放点击事件
	const playClick = () => {
		console.log(src);
		setIconHidden(false);
		playVoice();
	};
	// * 翻译点击事件
	const sttClick = () => {
		setSttState(false);
		// sst请求
		setTimeout(() => {
			setSttState(true);
		}, 2000);
	};

	// * 播放语音
	const playVoice = () => {
		// 模拟播放
		setTimeout(() => {
			setIconHidden(true);
		}, 2000);
	};
	useEffect(() => {
		let bl = iconHidden;
		setIconHidden(bl);
	}, [iconHidden]);

	return (
		<>
			{`${iconHidden}`}
			<div className="ri">
				<div className="ri-message-box">
					<span onClick={playClick}>
						{len + " s"}
						<img style={{ width: "20px" }} src={iconHidden ? staticRight : right}></img>
					</span>
					<SyncOutlined className="stt-icon" hidden={sttState} spin />
					<FileSearchOutlined className="stt-icon" hidden={!sttState} onClick={sttClick} />
				</div>
				<Avatar shape="square" src={avatar} />
			</div>
			<span>鸡鸡鸡 蹦蹦蹦 鸡鸡鸡 蹦蹦蹦 鸡鸡鸡 蹦蹦蹦 鸡鸡鸡 蹦蹦蹦</span>
		</>
	);
}
