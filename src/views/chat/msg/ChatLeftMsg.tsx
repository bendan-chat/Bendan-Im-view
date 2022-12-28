import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
interface IProps {
	msg: string;
}

export default function ChatLeftMsg({ msg }: IProps) {
	return (
		<>
			<div className="le">
				<Avatar shape="square" icon={<UserOutlined />} />
				<div className="le-message-box">{msg}</div>
			</div>
		</>
	);
}
