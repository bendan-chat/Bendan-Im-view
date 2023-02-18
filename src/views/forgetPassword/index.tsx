/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import SwitchDark from "@/components/SwitchDark";
import BackToLogin from "@/components/BackToLogin";

import "./index.less";
import ForgetBefore from "./components/ForgetBefore";
import ForgetCheck from "./components/ForgetCheckBefore";

export default function ForgetPassword() {
	const [select, setSelect] = useState<number>(0);
	const [passport, setPassport] = useState<string>("");

	/**
	 * 匹配忘记密码div
	 * @param key
	 * @returns
	 */
	const matchForgetDiv = (key: number) => {
		switch (key) {
			case 0:
				return <ForgetBefore setPassport={setPassport} setSelect={setSelect} />;
			case 2:
				return <ForgetCheck email={passport} />;
		}
	};
	return (
		<div className="login-container">
			<BackToLogin />
			<SwitchDark />
			<div className="login-box">
				<div className="login-form">
					<div className="forget-div">{matchForgetDiv(select)}</div>
				</div>
			</div>
		</div>
	);
}
