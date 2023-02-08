import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.less";

const NotAuth = () => {
	const navigate = useNavigate();
	const goHome = () => {
		navigate("/login");
	};
	return (
		<Result
			status="403"
			title="403"
			subTitle="Sorry, you are not authorized to access this page."
			extra={
				<Button type="primary" onClick={goHome}>
					回到 登录页
				</Button>
			}
		/>
	);
};

export default NotAuth;
