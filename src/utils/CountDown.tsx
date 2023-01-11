import React, { useEffect, useState } from "react";

interface IProp {
	time: number;
	// 停止倒计时
	timeStop: () => boolean;
	// 开始倒计时
	timeStart: () => boolean;
	// 重制倒计时
	timeReStart: () => boolean;
}
export default function CountDown({ time, timeReStart, timeStart }: IProp) {
	const [counter, setCounter] = useState(time);
	//倒计时
	useEffect(() => {
		if (timeStart() && counter >= 0) {
			setTimeout(() => {
				setCounter(counter - 1);
			}, 1000);
		} else if (timeReStart()) {
			setCounter(time);
		}
	}, [counter]);
	return <>{counter}</>;
}
