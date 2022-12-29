// import React from "react";
// import lazyLoad from "@/routers/util/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
// import { RouteObject } from "@/routers/interface";
import Home from "@/views/home/home";
import { RouteObject } from "react-router-dom";

// 首页模块
const homeRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/home/index",
				element: <Home />
			}
		]
	}
];

export default homeRouter;
