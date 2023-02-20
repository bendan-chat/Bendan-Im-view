import { Avatar } from "antd";
import { ChatProps } from "@/views/chat/interface/ChatProps";

export default function ChatVideoRightMsg({ msg, avatar }: ChatProps.CommonProps) {
	return (
		<li>
			<div className="video-ri">
				<div className="video-ri-box">
					<div className="video-ri-message-box">
						<video style={{ width: "100%" }} src={msg} controls>
							your browser does not support the video tag
						</video>
					</div>
					<Avatar shape="square" src={avatar} />
				</div>
			</div>
		</li>
	);
}
