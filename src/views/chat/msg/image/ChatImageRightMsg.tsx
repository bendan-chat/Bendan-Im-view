import { Avatar, Image } from "antd";
import { ChatProps } from "@/views/chat/interface/ChatProps";

import "./ChatImage.less";

export default function ChatImageRightMsg({ msg, avatar }: ChatProps.CommonProps) {
	return (
		<li>
			<div className="image-ri">
				<div className="image-ri-box">
					<div className="image-ri-message-box">
						<Image height={"150px"} width={"150px"} src={msg} />
					</div>
					<Avatar shape="square" src={avatar} />
				</div>
			</div>
		</li>
	);
}
