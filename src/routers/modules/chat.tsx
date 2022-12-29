import React from "react";
import { RouteObject } from "@/routers/interface";
import { LayoutIndex } from "@/routers/constant";
import lazyLoad from "../utils/lazyLoad";

// 错误页面模块
const AuthRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/chat/:id",
				element: lazyLoad(React.lazy(() => import("@/views/chat/chat"))),
				// element: ,
				meta: {
					requiresAuth: true,
					title: "聊天室",
					key: "chat"
				}
			}
		]
	}
];

export default AuthRouter;
