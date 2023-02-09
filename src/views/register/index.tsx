import BackToLogin from "@/components/BackToLogin";
import SwitchDark from "@/components/SwitchDark";
// import loginLeft from "@/assets/images/login_left4.png";
// import logo from "@/assets/images/logo.png";
import React from "react";
import RegisterForm from "./components/RegisterForm";

import "./index.less";

export default function Register() {
	return (
		<div className="login-container">
			<BackToLogin />
			<SwitchDark />
			<div className="login-box">
				<div className="register-div-parent">
					<span className="register-span-text">欢迎注册Bendan-Im</span>
					<RegisterForm />
				</div>
			</div>
		</div>
	);
}
