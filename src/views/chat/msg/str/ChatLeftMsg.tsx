import { Avatar } from "antd";
import { ChatProps } from "@/views/chat/interface/ChatProps";

import "./ChatStr.less";

export default function ChatLeftMsg({ msg, avatar }: ChatProps.CommonProps) {
	return (
		<li>
			<div className="str-le">
				<div className="str-le-box">
					<Avatar shape="square" src={avatar} />
					<div className="str-le-message-box">
						<span>{msg}</span>
					</div>
				</div>
			</div>
		</li>
	);
}
