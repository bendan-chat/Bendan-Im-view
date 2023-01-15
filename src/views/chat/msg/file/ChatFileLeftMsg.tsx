import { Avatar, Modal } from "antd";
import { ChatProps } from "@/views/chat/interface/ChatProps";
import { FileTwoTone } from "@ant-design/icons";
import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import { DownloadUrl } from "@/utils/DownloadUtil";
import { splitUrlToFileName } from "@/utils/util";

import "./ChatFile.less";

export default function ChatFileLeftMsg({ avatar, size, msg }: ChatProps.FileProps) {
	/**
	 * 下载点击
	 */
	function downloadClick() {
		Modal.confirm({
			title: "下载文件 🧡",
			centered: true,
			icon: <VerticalAlignBottomOutlined />,
			content: "当前操作会下载文件是否需要？",
			okText: "确认",
			cancelText: "取消",
			onOk: async () => {
				DownloadUrl.downloadUrl(msg!);
			}
		});
	}
	return (
		<>
			<div className="file-le">
				<div className="file-le-box">
					<Avatar shape="square" src={avatar} />
					<div className="file-le-message-box" onClick={downloadClick}>
						<div className="file-icon" style={{ marginTop: "8px", marginRight: "35px", float: "left" }}>
							<FileTwoTone style={{ fontSize: "50px" }} />
						</div>
						<div className="file-info-name" style={{ float: "right" }}>
							<p style={{ fontSize: "16px" }}>{splitUrlToFileName(msg!)}</p>
							<sub style={{ fontSize: "1px" }}>{size + " B"}</sub>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
