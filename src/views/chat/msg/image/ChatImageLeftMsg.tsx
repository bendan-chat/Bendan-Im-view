import { Avatar, Image } from "antd";
import { ChatProps } from "@/views/chat/interface/ChatProps";

import "./ChatImage.less";

export default function ChatImageLeftMsg({ msg, avatar }: ChatProps.CommonProps) {
	return (
		<>
			<div className="image-le">
				<div className="image-le-box">
					<Avatar shape="square" src={avatar} />
					<div className="image-le-message-box">
						<Image width={200} src={msg} />
					</div>
				</div>
			</div>
		</>
	);
}
