import "./chat.less";
import ChatBottomSend from "./msg/ChatBottomSend";
import ChatLeftMsg from "./msg/ChatLeftMsg";
import ChatRightMsg from "./msg/ChatRightMsg";

const User = () => {
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
					<ChatBottomSend />
				</div>
			</div>
		</>
	);
};

export default User;
