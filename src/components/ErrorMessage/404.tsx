import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.less";

const NotFound = () => {
	const navigate = useNavigate();
	const goHome = () => {
		navigate("/login");
	};
	return (
		<Result
			status="404"
			title="404"
			subTitle="Sorry, the page you visited does not exist."
			extra={
				<Button type="primary" onClick={goHome}>
					回到 登录页
				</Button>
			}
		/>
	);
};

export default NotFound;
