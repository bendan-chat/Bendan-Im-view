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
			},
			{
				path: "/friends",
				element: lazyLoad(React.lazy(() => import("@/views/friends"))),
				// element: ,
				meta: {
					requiresAuth: true,
					title: "群组",
					key: "group"
				}
			},
			{
				path: "/newFriends",
				element: lazyLoad(React.lazy(() => import("@/views/newFriends"))),
				// element: ,
				meta: {
					requiresAuth: true,
					title: "新的朋友",
					key: "newFriends"
				}
			},
			{
				path: "/friend/:id",
				element: lazyLoad(React.lazy(() => import("@/views/friend"))),
				// element: ,
				meta: {
					requiresAuth: true,
					title: "朋友",
					key: "friend"
				}
			}
		]
	}
];

export default AuthRouter;
