import { Avatar } from "antd";
import { ChatProps } from "@/views/chat/interface/ChatProps";

import "./ChatVideo.less";

export default function ChatVideoLeftMsg({ msg, avatar }: ChatProps.CommonProps) {
	return (
		<li>
			<div className="video-le">
				<div className="video-le-box">
					<Avatar shape="square" src={avatar} />
					<div className="video-le-message-box">
						<video style={{ width: "100%" }} src={msg} controls>
							your browser does not support the video tag
						</video>
					</div>
				</div>
			</div>
		</li>
	);
}
