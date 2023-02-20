import { Ref, useImperativeHandle, useState } from "react";
import { Avatar, Input, Modal, Card, Empty, Button } from "antd";
import { getUserInfo } from "@/api/modules/user";
import { Account } from "@/api/interface/user";

import "./AddFriend.less";
import { addNewFriend } from "@/api/modules/chat";
import { Chat } from "@/api/interface/chat";
import { store } from "@/redux";
import { sendMessage } from "@/websocket";
import { SendCode } from "@/websocket/type";
import { useNavigate } from "react-router-dom";

const { Search } = Input;
const { Meta } = Card;
interface Props {
	innerRef: Ref<{ showModal: (friends: Account.FriendUser[]) => void }>;
	setSelectId: (id: number) => void;
}
export const AddFriend = ({ innerRef, setSelectId }: Props) => {
	const { userId, nickName, avatar } = store.getState().global.userInfo;

	const [isModalOpenAddUser, setIsModalOpenAddUser] = useState<boolean>(false);
	const [selectFriend, setSelectFriend] = useState<boolean>(false);
	const [addSendMsg, setAddSendMsg] = useState<string>("");
	const [searchText, setSearchText] = useState<string>("请搜索......");
	const [data, setData] = useState<Account.UserInfo>({});
	const [addhidden, setAddHidden] = useState<boolean>(false);
	const [friends, setFriends] = useState<Account.FriendUser[]>();
	const [haveFriend, setHaveFriend] = useState<boolean>(true);

	const navigate = useNavigate();

	/**
	 * 更新输入框的内容
	 */
	const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setAddSendMsg(e.target.value);
	};
	useImperativeHandle(innerRef, () => ({
		showModal
	}));

	const showModal = (friends: Account.FriendUser[]) => {
		setFriends(friends);
		setIsModalOpenAddUser(true);
	};

	const handleCancel = () => {
		clearCache();
	};

	/**
	 * 搜索事件
	 */
	const onSearch = (value: string) => {
		setHaveFriend(true);
		if (value != "" && value.length > 0) {
			getUserInfo(value).then(res => {
				if (res.success) {
					if (res.data == null) {
						setSelectFriend(false);
						setSearchText("无法找到该用户，请检查你填写的帐号是否正确。");
					} else {
						let userDetail = res.data;
						setData(userDetail);
						setSelectFriend(true);
						if (
							friends?.find(v => {
								return v.id == userDetail.id;
							}) != undefined
						) {
							setHaveFriend(false);
						}
					}
				}
			});
		} else {
			setSelectFriend(false);
			setSearchText("请搜索......");
		}
	};

	/**
	 * 添加按钮点击事情
	 */
	function btnAddClick() {
		setAddHidden(true);
	}

	function btnSendClick() {
		clearCache();
		navigate("/friend" + "/" + data?.id);
		setSelectId(data?.id as number);
	}

	/**
	 * 添加好友确定点击事件
	 */
	function addFriendOk() {
		const params: Chat.NewFriendList = {
			curUserId: data?.id as number,
			addUserId: userId,
			nickname: nickName,
			avatar: avatar,
			description: addSendMsg
		};
		addNewFriend(params)
			.then(res => {
				if (res.success) {
					sendMessage({
						code: SendCode.ADD_NEWFRIEND,
						fromId: userId,
						toId: data?.id as number
					});
				}
			})
			.finally(() => {
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
		setData({});
		setHaveFriend(true);
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
						className="search-add-friends"
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
								haveFriend ? (
									<Button style={{ marginTop: "30px" }} onClick={btnAddClick} type="primary" key={"btn-add"}>
										添加好友
									</Button>
								) : (
									<Button style={{ marginTop: "30px" }} onClick={btnSendClick} type="primary" key={"btn-add"}>
										查看详情
									</Button>
								)
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
