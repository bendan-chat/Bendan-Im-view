import { Navigate, useRoutes } from "react-router-dom";
import { RouteObject } from "@/routers/interface";
import Login from "@/views/login/login";
import ForgetPassword from "@/views/forgetPassword";
import Register from "@/views/register";

// * 导入所有router
const metaRouters = import.meta.globEager("./modules/*.tsx");

// * 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item]).forEach((key: any) => {
		routerArray.push(...metaRouters[item][key]);
	});
});

export const rootRouter: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/login" />
	},
	{
		path: "/login",
		element: <Login />,
		meta: {
			requiresAuth: false,
			title: "登录页",
			key: "login"
		}
	},
	{
		path: "/login/register",
		element: <Register />,
		meta: {
			requiresAuth: false,
			title: "注册页",
			key: "loginRegister"
		}
	},
	{
		path: "/login/forget",
		element: <ForgetPassword />,
		meta: {
			requiresAuth: false,
			title: "忘记密码页",
			key: "loginForget"
		}
	},
	...routerArray,
	{
		path: "*",
		element: <Navigate to="/404" />
	}
];

// * 注册路由
const Router = () => {
	const routes = useRoutes(rootRouter);
	return routes;
};

export default Router;
