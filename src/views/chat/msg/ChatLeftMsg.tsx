import { Avatar } from "antd";
interface IProps {
	msg: string;
	avatar: string;
}

export default function ChatLeftMsg({ msg, avatar }: IProps) {
	return (
		<>
			<div className="le">
				<div className="le-box">
					<Avatar shape="square" src={avatar} />
					<div className="le-message-box">{msg}</div>
				</div>
			</div>
		</>
	);
}
