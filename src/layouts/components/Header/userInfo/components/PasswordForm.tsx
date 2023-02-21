import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { logout, updateUserPassword } from "@/api/modules/user";
import { useNavigate } from "react-router-dom";
import { setToken } from "@/redux/modules/global/action";
import { isPasswordCheck2, isPasswordCheck3 } from "@/utils/util";

interface IProps {
	userId: number;
	email: string;
	setPasswordForm: (passwordForm: boolean) => void;
	setIsModalVisible: (isModalVisible: boolean) => void;
}

export default function PasswordForm({ setPasswordForm, setIsModalVisible, userId, email }: IProps) {
	const [numValid, setNumValid] = useState<number>(0);

	const [password, setPassword] = useState<string>("");
	const [btnValid, setBtnValid] = useState<boolean>(true);
	const [iconColor, setIconColor] = useState<boolean[]>([true, true]);
	const [loading, setLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	const updatePassword = () => {
		setLoading(true);
		updateUserPassword(userId, password, email).then(async res => {
			if (res.success) {
				message.success("修改密码成功！！！");
				setToken("");
				navigate("/login");
				await logout();
				setPasswordForm(true);
				setIsModalVisible(false);
				setLoading(false);
			}
		});
	};

	/**
	 * 更新输入框的内容
	 * @param e
	 */
	const InputPassword = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		let value = e.target.value;
		setIconColor([true, true]);
		setNumValid(0);
		setPassword(value);
		if (isPasswordCheck2(value)) {
			setIconColor([false, true]);
			if (isPasswordCheck3(value)) {
				setIconColor([false, false]);
			}
		}
	};

	/**
	 * 确认输入框的内容
	 * @param e
	 */
	const confirmInputPassword = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		let passwordUpdate = e.target.value;
		setNumValid(0);
		setBtnValid(true);
		if (password == passwordUpdate) {
			if (!iconColor[0]) {
				setBtnValid(false);
			} else {
				setNumValid(2);
			}
		} else {
			setNumValid(1);
		}
	};

	const matchValid = (key: number) => {
		switch (key) {
			case 0:
				return "";
			case 1:
				return "前后密码不一致请检查！！！";
			case 2:
				return "密码强度不够，至少满足第一个条件！！！";
		}
	};
	return (
		<div className="password-update-Form">
			<Form>
				<span style={{ fontWeight: "bold", fontSize: "15px" }}>设置新的密码</span>
				<Form.Item
					name="InputPassword"
					rules={[
						{
							required: true,
							message: "请输入你的密码！！！"
						}
					]}
				>
					<Input.Password
						style={{ marginTop: "30px" }}
						onChange={InputPassword}
						placeholder="请输入新密码"
						allowClear={true}
						maxLength={16}
						minLength={8}
						className="password-update-input-password"
					/>
				</Form.Item>
				<Form.Item
					style={{ marginTop: "30px" }}
					name="confirmPassword"
					validateStatus={numValid != 0 ? "error" : ""}
					help={matchValid(numValid)}
				>
					<Input.Password
						onChange={confirmInputPassword}
						placeholder="请再次输入新密码"
						allowClear={true}
						maxLength={16}
						className="password-update-input-password"
					/>
				</Form.Item>
				<Form.Item name="text">
					<div className="detail-text">
						<span>至少满足一个条件</span>
						<div>
							<CheckCircleTwoTone twoToneColor={iconColor[0] ? "#b0b3be" : "#52c41a"} />
							<span className={iconColor[0] ? "detail-text-span" : ""}> 密码由8-16位数字、字母或符号组成</span>
						</div>
						<div>
							<CheckCircleTwoTone twoToneColor={iconColor[1] ? "#b0b3be" : "#52c41a"} />
							<span className={iconColor[1] ? "detail-text-span" : ""}> 至少含2种以上字符</span>
						</div>
					</div>
				</Form.Item>
			</Form>
			<Button
				disabled={btnValid}
				onClick={updatePassword}
				type="primary"
				className="password-update-btn-nextStep"
				htmlType="submit"
				loading={loading}
			>
				修改
			</Button>
		</div>
	);
}
