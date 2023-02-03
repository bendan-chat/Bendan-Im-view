import { Ref, useImperativeHandle, useState } from "react";
import { Avatar, Input, Modal, Card, Empty, Button } from "antd";
import { getUserInfo } from "@/api/modules/user";
import { Account } from "@/api/interface/user";

import "./AddFriend.less";
import { addNewFriend } from "@/api/modules/chat";
import { Chat } from "@/api/interface/chat";
import { store } from "@/redux";

const { Search } = Input;
const { Meta } = Card;
interface Props {
	innerRef: Ref<{ showModal: () => void }>;
}
export const AddFriend = (props: Props) => {
	const { userId } = store.getState().global.userInfo;

	const [isModalOpenAddUser, setIsModalOpenAddUser] = useState<boolean>(false);
	const [selectFriend, setSelectFriend] = useState<boolean>(false);
	const [addSendMsg, setAddSendMsg] = useState<string>("");
	const [searchText, setSearchText] = useState<string>("请搜索......");
	const [data, setData] = useState<Account.UserInfo>();
	const [addhidden, setAddHidden] = useState<boolean>(false);

	/**
	 * 更新输入框的内容
	 */
	const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setAddSendMsg(e.target.value);
	};
	useImperativeHandle(props.innerRef, () => ({
		showModal
	}));

	const showModal = () => {
		setIsModalOpenAddUser(true);
	};

	const handleCancel = () => {
		clearCache();
	};

	/**
	 * 搜索事件
	 */
	const onSearch = (value: string) => {
		getUserInfo(value).then(res => {
			if (res.success) {
				if (res.data == null) {
					setSelectFriend(false);
					setSearchText("无法找到该用户，请检查你填写的帐号是否正确。");
				} else {
					setData(res.data);
					setSelectFriend(true);
				}
			}
		});
	};

	/**
	 * 添加按钮点击事情
	 */
	function btnAddClick() {
		setAddHidden(true);
	}

	/**
	 * 添加好友确定点击事件
	 */
	function addFriendOk() {
		const params: Chat.NewFriendList = {
			curUserId: data?.id as number,
			addUserId: userId,
			nickname: data?.nickName as string,
			avatar: data?.avatar as string,
			description: addSendMsg
		};
		addNewFriend(params).finally(() => {
			clearCache();
		});
	}

	/**
	 * 清除useState 缓存
	 */
	function clearCache() {
		setIsModalOpenAddUser(false);
		setAddHidden(false);
		setSelectFriend(false);
		setAddSendMsg("");
	}

	return (
		<>
			<Modal
				maskClosable={false}
				cancelButtonProps={{
					style: {
						float: "left"
					}
				}}
				onCancel={handleCancel}
				open={isModalOpenAddUser}
				destroyOnClose={true}
				footer={null}
			>
				<br />
				<div hidden={addhidden} style={{ display: "flex", flexDirection: "column" }}>
					<Search
						style={{ alignItems: "center" }}
						placeholder="输入账号......"
						allowClear
						enterButton="Search"
						size="large"
						onSearch={onSearch}
					/>
					<br />
					{selectFriend ? (
						<Card
							style={{ width: 473 }}
							actions={[
								<Button style={{ marginTop: "30px" }} onClick={btnAddClick} type="primary" key={"btn-add"}>
									添加好友
								</Button>
							]}
						>
							<Meta
								avatar={<Avatar size={80} src={data?.avatar} />}
								title={data?.nickName as string}
								description={data?.selfDescription}
							/>
						</Card>
					) : (
						<Empty style={{ marginBottom: "50px" }} description={searchText} />
					)}
				</div>

				<div hidden={!addhidden} className="send-addFriend">
					<div className="send-addFriend-top">
						<span>发送添加朋友申请：</span>
						<Input onChange={onChange} value={addSendMsg} className="input-css" />
					</div>
					<div className="send-addFriend-botton">
						<Button onClick={addFriendOk} className="btn-ok">
							确定
						</Button>
						<Button onClick={handleCancel} className="btn-cancal">
							取消
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
};
