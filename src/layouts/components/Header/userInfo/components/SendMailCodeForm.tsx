import { sendMailCode } from "@/api/modules/mail";
import { hiddenPassPort } from "@/utils/util";
import { Button, Form, Input } from "antd";
import { useEffect, useRef, useState } from "react";

interface IProps {
	email: string;
	onNextStep: (passwordForm: boolean) => void;
}

export default function SendMailCodeForm({ onNextStep, email }: IProps) {
	const [sendCode, setSendCode] = useState<boolean>(true);
	const [hiddenNextStep, setHiddenNextStep] = useState<boolean>(true);
	const [time, setTime] = useState<number>(0); //倒计时时间
	const [inputValid, setInputValid] = useState<boolean>(false);
	const [code, setCode] = useState<number>(); //验证码

	const timeRef = useRef<NodeJS.Timeout>(); //设置延时器

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
		setSendCode(false);
		setTime(60);
		let num = Random();
		console.log("验证码", num);
		setCode(Number.parseInt(num));
		sendMailCode(email, num);
	};

	/**
	 * 生成验证码 【100000，999999】
	 */
	function Random() {
		return (Math.round(Math.random() * (999999 - 100000)) + 100000).toString();
	}

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

	/**
	 * 下一步
	 */
	const nextStepClick = () => {
		onNextStep(false);
	};

	return (
		<div className="password-update-parent">
			<span style={{ fontWeight: "bold", fontSize: "15px" }}>邮箱验证</span>
			<span>请通过邮箱 {<span style={{ color: "#febe79" }}>{hiddenPassPort(email)}</span>} 接收邮箱验证码</span>
			<div className="password-update-box">
				<Form autoComplete="off">
					<Form.Item validateStatus={inputValid ? "error" : ""} help={inputValid ? "验证码不正确请检查！！！" : ""}>
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
