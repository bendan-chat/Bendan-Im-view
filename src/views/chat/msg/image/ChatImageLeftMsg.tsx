import { Avatar } from "antd";
import { ChatProps } from "@/views/chat/interface/ChatProps";

export default function ChatImageLeftMsg({ msg, avatar }: ChatProps.CommonProps) {
	return (
		<>
			<div className="le">
				<div className="le-box">
					<Avatar shape="square" src={avatar} />
					<div className="le-message-box">
						<span>{msg}</span>
					</div>
				</div>
			</div>
		</>
	);
}
