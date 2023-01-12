import { Avatar } from "antd";
import { ChatProps } from "@/views/chat/interface/ChatProps";
import "./ChatStr.less";

export default function ChatRightMsg({ msg, avatar }: ChatProps.CommonProps) {
	return (
		<>
			<div className="str-ri">
				<div className="str-ri-box">
					<div className="str-ri-message-box">
						<span>{msg}</span>
					</div>
					<Avatar shape="square" src={avatar} />
				</div>
			</div>
		</>
	);
}
