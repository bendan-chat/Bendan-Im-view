import { Avatar } from "antd";
interface IProps {
	msg: string;
	avatar: string;
}

export default function ChatLeftMsg({ msg, avatar }: IProps) {
	return (
		<>
			<div className="le">
				<Avatar shape="square" src={avatar} />
				<div className="le-message-box">{msg}</div>
			</div>
		</>
	);
}
