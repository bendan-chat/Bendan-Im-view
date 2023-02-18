/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Button, Input } from "antd";

interface IProps {
	setPassport: (passport: string) => void;
	setSelect: (key: number) => void;
}

export default function ForgetBefore({ setSelect, setPassport }: IProps) {
	const [match, setMatch] = useState<boolean>(true);
	const [btnAble, setBtnAble] = useState<boolean>(true);
	const [inputValue, setInputValue] = useState<string>("");

	/**
	 * 更新输入框的内容
	 * @param e
	 */
	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setMatch(true);
		setBtnAble(true);
		let v = e.target.value;
		setInputValue(v);
		if (v != "") {
			setBtnAble(false);
		}
	};
	return (
		<>
			<span className="forget-span-text">
				<span style={{ color: "#2b8dfd" }}>| </span>找回密码
			</span>
			<Input
				allowClear={true}
				onChange={onChangeInput}
				placeholder={"输入邮箱......"}
				// placeholder={match ? "输入账号......" : "输入邮箱......"}
				className="forget-form-input"
			/>
			<Button
				onClick={() => {
					setPassport(inputValue);
					setSelect(2);
				}}
				disabled={btnAble}
				type="primary"
				className="forget-form-btn"
			>
				下一步
			</Button>
			{/* <a
				onClick={() => {
					setMatch(!match);
				}}
			>
				{match ? "使用邮箱找回密码" : "使用账号找回密码"}
			</a> */}
		</>
	);
}
