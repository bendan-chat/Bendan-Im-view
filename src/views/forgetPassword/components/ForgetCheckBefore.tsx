/* eslint-disable @typescript-eslint/no-unused-vars */
import PasswordForm from "@/layouts/components/Header/userInfo/components/PasswordForm";
import SendMailCodeForm from "@/layouts/components/Header/userInfo/components/SendMailCodeForm";
import React, { useState } from "react";
interface IProps {
	email: string;
}

export default function ForgetCheckBefore({ email }: IProps) {
	const [match, setMatch] = useState<boolean>(true);

	return (
		<>
			<span className="forget-span-text">
				<span style={{ color: "#2b8dfd" }}>| </span>找回密码
			</span>
			{match ? (
				<SendMailCodeForm email={email} onNextStep={setMatch} />
			) : (
				<PasswordForm setIsModalVisible={setMatch} setPasswordForm={setMatch} />
			)}
		</>
	);
}