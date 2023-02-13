/**
 * CustomEvent 缓存避免过多创建CustomEvent
 */

function subscribe(eventName: string, listener: EventListenerOrEventListenerObject) {
	document.addEventListener(eventName, listener);
}

function unsubscribe(eventName: string, listener: EventListenerOrEventListenerObject) {
	document.removeEventListener(eventName, listener);
}

function publish(eventName: string, data: any) {
	let event: CustomEvent = new CustomEvent(eventName, { detail: data });
	document.dispatchEvent(event);
}

export { publish, subscribe, unsubscribe };
