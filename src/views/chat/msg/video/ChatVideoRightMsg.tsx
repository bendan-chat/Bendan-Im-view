import { Avatar } from "antd";
import { ChatProps } from "@/views/chat/interface/ChatProps";

export default function ChatVideoRightMsg({ msg, avatar }: ChatProps.CommonProps) {
	return (
		<>
			<div className="ri">
				<div className="ri-box">
					<div className="ri-message-box">
						<span>{msg}</span>
					</div>
					<Avatar shape="square" src={avatar} />
				</div>
			</div>
		</>
	);
}
