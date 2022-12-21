import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { RouteObject } from "@/routers/interface";
import { LayoutIndex } from "@/routers/constant";

// 错误页面模块
const AuthRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "权限管理"
		},
		children: [
			{
				path: "/auth/user",
				element: lazyLoad(React.lazy(() => import("@/views/auth/userAuth/user"))),
				meta: {
					requiresAuth: true,
					title: "用户管理",
					key: "AuthUser"
				}
			},
			{
				path: "/auth/role",
				element: lazyLoad(React.lazy(() => import("@/views/auth/roleAuth/role"))),
				meta: {
					requiresAuth: true,
					title: "角色管理",
					key: "AuthRole"
				}
			},
			{
				path: "/auth/menu",
				element: lazyLoad(React.lazy(() => import("@/views/auth/menuAuth/menu"))),
				meta: {
					requiresAuth: true,
					title: "菜单管理",
					key: "AuthMenu"
				}
			}
		]
	}
];

export default AuthRouter;
