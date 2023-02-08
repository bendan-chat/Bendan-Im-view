import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.less";

const NotNetwork = () => {
	const navigate = useNavigate();
	const goHome = () => {
		navigate("/login");
	};
	return (
		<Result
			status="500"
			title="500"
			subTitle="Sorry, something went wrong."
			extra={
				<Button type="primary" onClick={goHome}>
					回到 登录页
				</Button>
			}
		/>
	);
};

export default NotNetwork;
