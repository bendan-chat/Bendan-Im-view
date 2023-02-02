import { Ref, useImperativeHandle, useState } from "react";
import { Avatar, Input, Modal, Card, Empty, Button } from "antd";
import { getUserInfo } from "@/api/modules/user";
import { Account } from "@/api/interface/user";

const { Search } = Input;
const { Meta } = Card;
interface Props {
	innerRef: Ref<{ showModal: (params: any) => void }>;
}
export const AddFriend = (props: Props) => {
	const [isModalOpenAddUser, setIsModalOpenAddUser] = useState<boolean>(false);
	const [selectFriend, setSelectFriend] = useState<boolean>(false);
	const [search, setSearch] = useState<string>("");
	const [data, setData] = useState<Account.UserInfo>();

	// * 更新输入框的内容
	const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setSearch(e.target.value);
	};
	useImperativeHandle(props.innerRef, () => ({
		showModal
	}));

	const showModal = (params: { name: number }) => {
		console.log(params);
		setIsModalOpenAddUser(true);
	};

	const handleCancel = () => {
		setIsModalOpenAddUser(false);
	};

	/**
	 * 搜索事件
	 */
	const onSearch = () => {
		getUserInfo(search).then(res => {
			if (res.success) {
				if (res.data == null) {
					setSelectFriend(false);
				} else {
					setData(res.data);
					setSelectFriend(true);
				}
			}
		});
	};

	/**
	 * 按钮点击事情
	 */
	function btnAddClick() {
		setIsModalOpenAddUser(false);
	}
	return (
		<>
			<Modal
				cancelButtonProps={{
					style: {
						float: "left"
					}
				}}
				onCancel={handleCancel}
				open={isModalOpenAddUser}
				destroyOnClose
				footer={null}
			>
				<br />
				<div style={{ display: "flex", flexDirection: "column" }}>
					<Search
						onChange={onChange}
						value={search}
						style={{ alignItems: "center" }}
						placeholder="输入账户号......"
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
								<Button onClick={btnAddClick} type="primary" key={"btn-add"}>
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
						<Empty description={"无法找到该用户，请检查你填写的帐号是否正确。"} />
					)}
				</div>
			</Modal>
		</>
	);
};
