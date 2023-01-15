import React from "react";
import { SmileTwoTone } from "@ant-design/icons";

const emjoyClick = () => {
	console.log("emjoyClick");
};
export default function EmjoyIcon() {
	return (
		<>
			<SmileTwoTone onClick={emjoyClick} className="emjoy-left-icon" />
		</>
	);
}
