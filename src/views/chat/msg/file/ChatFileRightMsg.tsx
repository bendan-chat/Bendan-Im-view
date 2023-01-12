import { Avatar } from "antd";
import { ChatProps } from "@/views/chat/interface/ChatProps";
import { FileTwoTone } from "@ant-design/icons";

import "./ChatFile.less";

export default function ChatFileRightMsg({ avatar, msg, size }: ChatProps.FileProps) {
	const splitUrlToFileName = () => {
		const urlArgs: string[] | undefined = msg?.split("/");
		const nameArgs: string[] | undefined = urlArgs![urlArgs!.length - 1].split(".");
		let name = decodeURI(nameArgs[0]);
		let suffixName = nameArgs[1];
		return name + "." + suffixName;
	};
	return (
		<>
			<div className="file-ri">
				<div className="file-ri-box">
					<div className="file-ri-message-box">
						<div className="file-icon" style={{ marginTop: "8px", marginRight: "35px", float: "left" }}>
							<FileTwoTone style={{ fontSize: "50px" }} />
						</div>
						<div className="file-info-name" style={{ float: "right" }}>
							<p style={{ fontSize: "16px" }}>{splitUrlToFileName()}</p>
							<sub style={{ fontSize: "1px" }}>{size + " B"}</sub>
						</div>
					</div>
					<Avatar shape="square" src={avatar} />
				</div>
			</div>
		</>
	);
}
