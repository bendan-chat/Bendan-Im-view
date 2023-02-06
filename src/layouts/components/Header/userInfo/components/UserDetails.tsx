/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useImperativeHandle, Ref } from "react";
import { Modal, Button } from "antd";
import UploadAvatar from "./UploadAvatar";
import { Account } from "@/api/interface/user";
import { store } from "@/redux";
import { getUserInfo } from "@/api/modules/user";

import "./userDetails.less";

interface Props {
	innerRef: Ref<{ showModal: (params: any) => void }>;
}

const InfoModal = (props: Props) => {
	const [data, setData] = useState<Account.UserInfo>();
	const [modalVisible, setModalVisible] = useState(false);
	const { username, avatar } = store.getState().global.userInfo;
	const [myAvatar, setMyAvatar] = useState<string>("");

	useImperativeHandle(props.innerRef, () => ({
		showModal
	}));

	const showModal = () => {
		loadUserInfo();
		setModalVisible(true);
	};

	// 加载用户详情
	const loadUserInfo = () => {
		getUserInfo(username).then(res => {
			if (res.success) {
				setData(res.data);
				setMyAvatar(res.data.avatar as string);
			}
		});
	};

	/**
	 * 匹配性别
	 * @param gender
	 * @returns
	 */
	const matchSex = (gender: number) => {
		switch (gender) {
			case 0:
				return <span key={0}>女</span>;
			case 1:
				return <span key={1}>男</span>;
			case -1:
				return <span key={-1}>未知</span>;
		}
	};

	return (
		<Modal
			width={1000}
			centered
			keyboard
			title="个人信息"
			open={modalVisible}
			onCancel={() => {
				setModalVisible(false);
			}}
			destroyOnClose={true}
			footer={null}
		>
			<div className="userinfo-parent">
				<img className="big-img" src={myAvatar} />
				<div className="userinfo-text-parent">
					<div className="userinfo-text-item">
						<label className="userinfo-text-item-label">账号：</label>
						<span>{data?.username}</span>
					</div>
					<div className="userinfo-text-item">
						<label className="userinfo-text-item-label">昵称：</label>
						<span>{data?.nickName}</span>
					</div>
					<div className="userinfo-text-item">
						<label className="userinfo-text-item-label">性别：</label>
						{matchSex(data?.gender as number)}
					</div>
					<div className="userinfo-text-item">
						<label className="userinfo-text-item-label">手机：</label>
						<span>{data?.phoneNumber}</span>
					</div>
					<div className="userinfo-text-item">
						<label className="userinfo-text-item-label">邮箱：</label>
						<span>{data?.email}</span>
					</div>
				</div>
			</div>
			<div className="btn-down-parent">
				<UploadAvatar setModalVisible={setModalVisible} setMyAvatar={setMyAvatar} />
				<Button className="btn-down" type="primary" style={{ borderRadius: "8px" }}>
					修改信息
				</Button>
			</div>
		</Modal>
	);
};
export default InfoModal;
