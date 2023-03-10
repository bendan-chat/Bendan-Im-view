/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { SmileTwoTone } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

import "./EmjoyIcon.less";

const emjoys =
	"๐ ๐ ๐ ๐คฃ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ค ๐คฉ ๐ค ๐คจ ๐ ๐ ๐ถ ๐ ๐ ๐ฃ ๐ฅ ๐ฎ ๐ค ๐ฏ ๐ช ๐ซ ๐ด ๐ ๐ ๐ ๐ ๐คค ๐ ๐ ๐ ๐ ๐ ๐ค ๐ฒ โน๏ธ ๐ ๐ ๐ ๐ ๐ค ๐ข ๐ญ ๐ฆ ๐ง ๐จ ๐ฉ ๐คฏ ๐ฌ ๐ฐ ๐ฑ ๐ณ ๐คช ๐ต ๐ก ๐  ๐คฌ ๐ท ๐ค ๐ค ๐คข ๐คฎ ๐คง ๐ ๐ค  ๐คก ๐คฅ ๐คซ ๐คญ ๐ง ๐ค ๐ ๐ฟ ๐น ๐บ ๐ ๐ป ๐ฝ ๐ค ๐ฉ ๐บ ๐ธ ๐น ๐ป ๐ผ ๐ฝ ๐ ๐ฟ ๐พ ๐คฒ ๐ ๐ ๐ ๐ค ๐ ๐ ๐ โ ๐ค ๐ค ๐ค โ๏ธ ๐ค ๐ค ๐ ๐ ๐ ๐ ๐ โ๏ธ โ ๐ค ๐ ๐ ๐ ๐ค ๐ช ๐ โ๏ธ ๐";
const emjoyList = emjoys.split(" ");
interface IProps {
	msg: string;
	setMsg: (msg: any) => void;
}

export default function EmjoyIcon({ setMsg, msg }: IProps) {
	const [open, setOpen] = useState<boolean>(false);
	/**
	 * ๅค็่กจๆ
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
					{emjoyList[i]}
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
