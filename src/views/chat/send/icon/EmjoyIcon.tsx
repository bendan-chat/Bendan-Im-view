/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { SmileTwoTone } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

import "./EmjoyIcon.less";

const emjoys =
	"😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾 🤲 👐 🙌 👏 🤝 👍 👎 👊 ✊ 🤛 🤜 🤞 ✌️ 🤟 🤘 👌 👈 👉 👆 👇 ☝️ ✋ 🤚 🖐 🖖 👋 🤙 💪 🖕 ✍️ 🙏";
const emjoyList = emjoys.split(" ");
interface IProps {
	msg: string;
	setMsg: (msg: any) => void;
}

export default function EmjoyIcon({ setMsg, msg }: IProps) {
	const [open, setOpen] = useState<boolean>(false);
	/**
	 * 处理表情
	 * @returns
	 */
	function buildEmjoysSpan() {
		const emjoysSpans: JSX.Element[] = [];
		for (let i = 0; i < emjoyList.length; i++) {
			emjoysSpans.push(
				<Button
					type="text"
					className="emjoy-span"
					key={i}
					onClick={() => {
						setMsg(msg + emjoyList[i]);
						setOpen(false);
					}}
				>
					{" " + emjoyList[i]}
				</Button>
			);
		}
		return emjoysSpans;
	}
	return (
		<div>
			<Tooltip
				placement="topLeft"
				color="rgb(240 240 240)"
				open={open}
				title={
					<>
						<div className="emjoy-list-div-parent">{buildEmjoysSpan()}</div>
					</>
				}
			>
				<SmileTwoTone onClick={() => setOpen(!open)} className="emjoy-left-icon" />
			</Tooltip>
		</div>
	);
}
