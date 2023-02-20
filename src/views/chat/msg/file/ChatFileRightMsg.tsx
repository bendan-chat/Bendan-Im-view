import { Avatar, Modal } from "antd";
import { ChatProps } from "@/views/chat/interface/ChatProps";
import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import { FileTwoTone } from "@ant-design/icons";

import "./ChatFile.less";
import { DownloadUrl } from "@/utils/DownloadUtil";
import { splitUrlToFileName } from "@/utils/util";

export default function ChatFileRightMsg({ avatar, msg, size }: ChatProps.FileProps) {
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
		<li>
			<div className="file-ri">
				<div className="file-ri-box">
					<div className="file-ri-message-box" onClick={downloadClick}>
						<div className="file-icon" style={{ marginTop: "8px", marginRight: "35px", float: "left" }}>
							<FileTwoTone style={{ fontSize: "50px" }} />
						</div>
						<div className="file-info-name" style={{ float: "right" }}>
							<p style={{ fontSize: "16px" }}>{splitUrlToFileName(msg!)}</p>
							<sub style={{ fontSize: "1px" }}>{size + " B"}</sub>
						</div>
					</div>
					<Avatar shape="square" src={avatar} />
				</div>
			</div>
		</li>
	);
}
