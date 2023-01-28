import { Ref, useImperativeHandle, useState } from "react";
import { Avatar, Input, Modal, Card, Empty } from "antd";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SettingOutlined, EditOutlined, EllipsisOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Meta } = Card;
interface Props {
	innerRef: Ref<{ showModal: (params: any) => void }>;
}
export const AddFriend = (props: Props) => {
	const [isModalOpenAddUser, setIsModalOpenAddUser] = useState<boolean>(false);
	const [selectFriend, setSelectFriend] = useState<boolean>(false);

	useImperativeHandle(props.innerRef, () => ({
		showModal
	}));

	const showModal = (params: { name: number }) => {
		console.log(params);
		setIsModalOpenAddUser(true);
	};

	const handleOk = () => {
		setIsModalOpenAddUser(false);
	};

	const handleCancel = () => {
		setIsModalOpenAddUser(false);
	};

	const onSearch = () => {
		console.log("onSearch");
		setSelectFriend(true);
	};
	return (
		<>
			<Modal
				cancelButtonProps={{
					style: {
						float: "left"
					}
				}}
				onOk={handleOk}
				onCancel={handleCancel}
				open={isModalOpenAddUser}
			>
				<br />
				<div style={{ display: "flex", flexDirection: "column" }}>
					<Search
						style={{ alignItems: "center" }}
						placeholder="input search text"
						allowClear
						enterButton="Search"
						size="large"
						onSearch={onSearch}
					/>
					<br />
					{selectFriend ? (
						<Card style={{ width: 473 }} actions={[<SettingOutlined key="add" />]}>
							<Meta
								avatar={<Avatar src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
								title="名字"
								description="个性签名"
							/>
						</Card>
					) : (
						<Empty />
					)}
				</div>
			</Modal>
		</>
	);
};
