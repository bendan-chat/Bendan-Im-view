import React from "react";
import welcome from "@/assets/images/welcome01.png";

import "./index.less";

export default function index() {
	return (
		<div className="home card">
			<img src={welcome} alt="welcome" />
		</div>
	);
}
