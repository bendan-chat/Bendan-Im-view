/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { SmileTwoTone } from "@ant-design/icons";
import { Tooltip } from "antd";

import "./EmjoyIcon.less";

const emjoys =
	"😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾 🤲 👐 🙌 👏 🤝 👍 👎 👊 ✊ 🤛 🤜 🤞 ✌️ 🤟 🤘 👌 👈 👉 👆 👇 ☝️ ✋ 🤚 🖐 🖖 👋 🤙 💪 🖕 ✍️ 🙏";
const emjoyList = emjoys.split(" ");
interface IProps {
	setMsg: (msg: any) => void;
}

export default function EmjoyIcon({ setMsg }: IProps) {
	/**
	 * 处理表情
	 * @returns
	 */
	function buildEmjoysSpan() {
		const emjoysSpans: JSX.Element[] = [];
		for (let i = 0; i < emjoyList.length; i++) {
			emjoysSpans.push(
				<span
					className="emjoy-span"
					key={i}
					onClick={() => {
						console.log(i);
						setMsg(emjoyList[i]);
					}}
				>
					{" " + emjoyList[i] + " "}
				</span>
			);
		}
		return emjoysSpans;
	}
	return (
		<>
			<Tooltip
				placement="topLeft"
				trigger="click"
				color="#dedede"
				title={
					<>
						<div className="emjoy-list-div-parent">{buildEmjoysSpan()}</div>
					</>
				}
			>
				<SmileTwoTone className="emjoy-left-icon" />
			</Tooltip>
		</>
	);
}
