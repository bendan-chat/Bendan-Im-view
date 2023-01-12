import { Avatar } from "antd";
import { ChatProps } from "@/views/chat/interface/ChatProps";
import { FileTwoTone } from "@ant-design/icons";
import "./ChatFile.less";

export default function ChatFileLeftMsg({ avatar, fileName, size }: ChatProps.FileProps) {
	return (
		<>
			<div className="file-le">
				<div className="file-le-box">
					<Avatar shape="square" src={avatar} />
					<div className="file-le-message-box">
						<div className="file-icon" style={{ marginTop: "8px", marginRight: "35px", float: "left" }}>
							<FileTwoTone style={{ fontSize: "50px" }} />
						</div>
						<div className="file-info-name" style={{ float: "right" }}>
							<p style={{ fontSize: "16px" }}>{fileName}</p>
							<sub style={{ fontSize: "1px" }}>{size + " B"}</sub>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
