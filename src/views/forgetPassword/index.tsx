import React from "react";
import SwitchDark from "@/components/SwitchDark";
import loginLeft from "@/assets/images/login_left1.png";
import logo from "@/assets/images/logo.png";

import "./index.less";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
	const navigate = useNavigate();

	return (
		<div className="login-container">
			<SwitchDark />
			<div className="login-box">
				<div className="login-left">
					<img src={loginLeft} alt="login" />
				</div>
				<div className="login-form">
					<div className="login-logo">
						<img className="login-icon" src={logo} alt="logo" />
						<span className="logo-text"></span>
					</div>
					<Button
						onClick={() => {
							navigate("/login");
						}}
					>
						返回登录页
					</Button>
				</div>
			</div>
		</div>
	);
}
