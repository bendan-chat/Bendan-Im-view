import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

import "./index.less";

export default function BackToLogin() {
	const navigate = useNavigate();

	return (
		<Button
			type="link"
			className="back-to-login-link"
			onClick={() => {
				navigate("/login");
			}}
		>
			返回
		</Button>
	);
}
