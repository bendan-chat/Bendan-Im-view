/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { sendMailCode } from "@/api/modules/mail";
import { store } from "@/redux";
import { Button, Form, Input, message, Space } from "antd";
import { useEffect, useRef, useState } from "react";

interface IProps {
	setPasswordForm: (passwordForm: boolean) => void;
}

export default function SendMailCodeForm({ setPasswordForm }: IProps) {
	const [sendCode, setSendCode] = useState<boolean>(true);
	const [hiddenNextStep, setHiddenNextStep] = useState<boolean>(true);
	const [time, setTime] = useState<number>(0); //倒计时时间
	const [inputValid, setInputValid] = useState<boolean>(false);
	const [code, setCode] = useState<number>(123456); //验证码

	const timeRef = useRef<NodeJS.Timeout>(); //设置延时器
	const { email } = store.getState().global.userInfo;

	/**
	 * 倒计时
	 */
	useEffect(() => {
		//如果设置倒计时且倒计时不为0
		if (time && time !== 0)
			timeRef.current = setTimeout(() => {
				setTime(time - 1);
			}, 1000);
		if (time == 0) {
			setSendCode(true);
		}
		//清楚延时器
		return () => {
			clearTimeout(timeRef.current);
		};
	}, [time]);

	/**
	 * 发送验证码点击事件
	 */
	const sendCodeCilck = () => {
		// sendMailCode();
		setSendCode(false);
		setTime(60);
	};

	/**
	 * 更新输入框的内容
	 * @param e
	 */
	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setInputValid(false);
		setHiddenNextStep(true);
		let codeChange = Number.parseInt(e.target.value);
		if (codeChange > 100000 && codeChange < 1000000) {
			if (codeChange == code) {
				setHiddenNextStep(false);
			} else {
				setInputValid(true);
			}
		}
	};

	const nextStepClick = () => {
		setPasswordForm(false);
	};

	return (
		<div className="password-update-parent">
			<span style={{ fontWeight: "bold", fontSize: "15px" }}>邮箱验证</span>
			<span>请通过邮箱 {<span style={{ color: "#febe79" }}>{email}</span>} 接收邮箱验证码</span>
			<div className="password-update-box">
				<Form autoComplete="off">
					<Form.Item name="验证码" validateStatus={inputValid ? "error" : ""} help={inputValid ? "验证码错误请检查！！！" : ""}>
						<Input
							placeholder="请输入验证码......"
							allowClear={true}
							maxLength={6}
							onChange={onChangeInput}
							className="password-update-input"
						/>
						<Button disabled={!sendCode} type="text" onClick={sendCodeCilck} className="password-update-btn-code">
							{sendCode ? <span className="password-update-btn-code-span">发送验证码</span> : `重新发送 (${time})`}
						</Button>
					</Form.Item>
				</Form>
				<Button onClick={nextStepClick} disabled={hiddenNextStep} className="password-update-btn-nextStep" type="primary">
					下一步
				</Button>
			</div>
		</div>
	);
}
