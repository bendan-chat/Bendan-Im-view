import { Table, Input, Button, Space, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
// import type { PaginationProps } from "antd";
import { connect } from "react-redux";

const UserForm = () => {
	const { RangePicker } = DatePicker;

	interface TestObj {
		key: string;
		username: string;
		gender: string;
		email: string;
		status: string;
		phoneNumber: string;
		createTime: string;
	}
	const dataSource: TestObj[] = [];
	const obj = {
		key: "1",
		username: "胡彦斌",
		gender: "男",
		email: "16877978@gmail",
		status: "正常",
		phoneNumber: "1312341241244",
		createTime: "2022-11-12"
	};
	for (let i = 0; i < 200; i++) {
		dataSource.push(obj);
	}

	const columns: any[] = [
		{
			title: "用户名",
			dataIndex: "username",
			key: "username",
			align: "center"
		},
		{
			title: "性别",
			dataIndex: "gender",
			key: "gender",
			align: "center"
		},
		{
			title: "邮箱",
			dataIndex: "email",
			key: "email",
			align: "center"
		},
		{
			title: "状态",
			dataIndex: "status",
			key: "status",
			align: "center"
		},
		{
			title: "手机号",
			dataIndex: "phoneNumber",
			key: "phoneNumber",
			align: "center"
		},
		{
			title: "创建时间",
			dataIndex: "createTime",
			key: "createTime",
			align: "center"
		},
		{
			title: "操作",
			key: "action",
			align: "center",
			render: () => (
				<Button type="primary" shape="round">
					查看详情
				</Button>
			),
			width: "15%"
		}
	];

	// const onChange: PaginationProps["onChange"] = pageNumber => {
	// 	console.log("Page: ", pageNumber);
	// };
	const pagination = {
		current: 1,
		pageSize: 5
	};
	return (
		<div className="card content-box">
			<div className="input data">
				<Space>
					<Input placeholder="试试写点什么搜索一下~~" />
					<RangePicker />
					<Button icon={<SearchOutlined />} shape="round">
						搜索
					</Button>
				</Space>
				<Space style={{ float: "right" }}>
					<Button type="primary" shape="round">
						新增
					</Button>
					<Button type="primary" danger shape="round">
						删除
					</Button>
				</Space>
			</div>
			<br />
			<Table bordered={true} dataSource={dataSource} columns={columns} pagination={pagination} />
		</div>
	);
};

const mapDispatchToProps = {};
export default connect(null, mapDispatchToProps)(UserForm);
