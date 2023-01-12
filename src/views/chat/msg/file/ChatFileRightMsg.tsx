import { Avatar } from "antd";
import { ChatProps } from "@/views/chat/interface/ChatProps";
import { FileTwoTone } from "@ant-design/icons";

import "./ChatFile.less";

export default function ChatFileRightMsg({ avatar, fileName, size }: ChatProps.FileProps) {
	return (
		<>
			<div className="file-ri">
				<div className="file-ri-box">
					<div className="file-ri-message-box">
						<div className="file-icon" style={{ marginTop: "8px", marginRight: "35px", float: "left" }}>
							<FileTwoTone style={{ fontSize: "50px" }} />
						</div>
						<div className="file-info-name" style={{ float: "right" }}>
							<p style={{ fontSize: "16px" }}>{fileName}</p>
							<sub style={{ fontSize: "1px" }}>{size + " B"}</sub>
						</div>
					</div>
					<Avatar shape="square" src={avatar} />
				</div>
			</div>
		</>
	);
}
