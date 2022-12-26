import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

function UserStatus() {
	return (
		<div>
			<Avatar shape="square" size="small" icon={<UserOutlined />} />
		</div>
	);
}

export default UserStatus;
