import { Input, Button } from "antd";
const { TextArea } = Input;
import "./chat.less";
import ChatLeftMsg from "./msg/ChatLeftMsg";
import ChatRightMsg from "./msg/ChatRightMsg";

const User = () => {
	const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		console.log(e);
	};
	return (
		<>
			<div className="cr">
				<div className="message-container">
					<ChatLeftMsg msg="qqqqqqq" />
					<ChatRightMsg msg="ggggggg" />
					<ChatLeftMsg msg="qqqqqqq" />
					<ChatLeftMsg msg="qqqqqqq" />
					<ChatRightMsg msg="ggggggg" />
					<ChatLeftMsg msg="qqqqqqq" />
					<ChatLeftMsg msg="qqqqqqq" />
					<ChatLeftMsg msg="qqqqqqq" />
					<ChatRightMsg msg="ggggggg" />
					<ChatRightMsg msg="ggggggg" />
					<ChatRightMsg msg="ggggggg" />
				</div>
				<div className="chatFooter">
					<TextArea
						style={{ height: 150 }}
						autoSize={{ minRows: 3, maxRows: 7 }}
						placeholder="textarea with clear icon"
						allowClear
						onChange={onChange}
					/>
					<Button type="primary" style={{ float: "right" }}>
						发送
					</Button>
				</div>
			</div>
		</>
	);
};

export default User;
