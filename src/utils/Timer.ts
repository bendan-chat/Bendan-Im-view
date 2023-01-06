export class MyTimer {
	record: number = 0;

	start() {
		this.record = new Date().getTime();
	}
	stop() {
		let stopTime = new Date().getTime();
		let res = (stopTime - this.record!) / 1000;
		// this.record = 0;
		return res;
	}
}
