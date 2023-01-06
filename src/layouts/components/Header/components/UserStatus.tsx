import { Avatar } from "antd";
import { store } from "@/redux";

function UserStatus() {
	const { avatar } = store.getState().global.userInfo;
	return (
		<div>
			<Avatar shape="square" size="small" src={avatar} />
		</div>
	);
}

export default UserStatus;
