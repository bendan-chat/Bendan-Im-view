import { Avatar } from "antd";

interface IProps {
	src: string;
	len: number;
	avatar: string;
}

export default function ChatLeftVoiceMsg({ src, avatar, len }: IProps) {
	return (
		<>
			<div className="le">
				<Avatar shape="square" src={avatar} />
				<div className="le-message-box">{len + " s"}</div>
				<audio hidden src={src}></audio>
			</div>
		</>
	);
}
