import React from "react";
import { PhoneTwoTone } from "@ant-design/icons";

const phoneClick = () => {
	console.log("phoneClick");
};
export default function PhoneIcon() {
	return (
		<div>
			<PhoneTwoTone onClick={phoneClick} className="phone-right-icon" />
		</div>
	);
}
