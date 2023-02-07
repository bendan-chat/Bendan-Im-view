/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from "react";
import { Button, Form, Input } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
interface IProps {
	setPasswordForm: (passwordForm: boolean) => void;
	setIsModalVisible: (isModalVisible: boolean) => void;
}

export default function PasswordForm({ setPasswordForm, setIsModalVisible }: IProps) {
	const [inputValid, setInputValid] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");
	const [btnValid, setBtnValid] = useState<boolean>(true);
	const [iconColor, setIconColor] = useState<boolean>(true);

	const updatePassword = () => {
		setPasswordForm(true);
		setIsModalVisible(false);
	};

	/**
	 * 更新输入框的内容
	 * @param e
	 */
	const InputPassword = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setInputValid(false);
		setPassword(e.target.value);
	};

	/**
	 * 确认输入框的内容
	 * @param e
	 */
	const confirmInputPassword = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		let passwordUpdate = e.target.value;
		setInputValid(false);
		if (password == passwordUpdate) {
			setBtnValid(false);
		} else {
			setInputValid(true);
		}
	};
	return (
		<div className="password-update-Form">
			<Form style={{ margin: "25px" }}>
				<span style={{ fontWeight: "bold", fontSize: "15px" }}>设置新的密码</span>
				<Form.Item name="InputPassword">
					<Input.Password
						onChange={InputPassword}
						placeholder="请设置新密码"
						allowClear={true}
						maxLength={16}
						className="password-update-input-password"
					/>
				</Form.Item>
				<Form.Item
					name="confirmPassword"
					validateStatus={inputValid ? "error" : ""}
					help={inputValid ? "验证码错误请检查！！！" : ""}
				>
					<Input.Password
						onChange={confirmInputPassword}
						placeholder="请再次输入新密码"
						allowClear={true}
						maxLength={16}
						className="password-update-input-password"
					/>
				</Form.Item>
				<div className="detail-text">
					<div>
						<CheckCircleTwoTone twoToneColor={iconColor ? "#b0b3be" : ""} />
						<span className={iconColor ? "detail-text-span" : ""}> 密码由8-16位数字、字母或符号组成</span>
					</div>
					<div>
						<CheckCircleTwoTone twoToneColor={iconColor ? "#b0b3be" : ""} />
						<span className={iconColor ? "detail-text-span" : ""}> 至少含2种以上字符</span>
					</div>
				</div>
			</Form>
			<Button
				disabled={btnValid}
				onClick={updatePassword}
				type="primary"
				className="password-update-btn-nextStep"
				htmlType="submit"
			>
				修改
			</Button>
		</div>
	);
}
