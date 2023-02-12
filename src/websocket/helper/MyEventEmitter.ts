/**
 * CustomEvent 缓存避免过多创建CustomEvent
 */
const eventMap = new Map<string, CustomEvent>();

function subscribe(eventName: string, listener: EventListenerOrEventListenerObject) {
	document.addEventListener(eventName, listener);
}

function unsubscribe(eventName: string, listener: EventListenerOrEventListenerObject) {
	document.removeEventListener(eventName, listener);
}

function publish(eventName: string, data: any) {
	let event: CustomEvent;
	if (eventMap.has(eventName)) {
		console.log(eventName, "存在用缓存");
		event = eventMap.get(eventName)!;
	} else {
		event = new CustomEvent(eventName, { detail: data });
	}
	document.dispatchEvent(event);
}

export { publish, subscribe, unsubscribe };
