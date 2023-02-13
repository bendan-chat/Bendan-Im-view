/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * 合并kv
 * @param k
 * @param v
 * @returns
 */
export function margeKv(k: number, v: number) {
	return k + ":" + v;
}

export function partKv(countMix: string) {
	// console.log(countMix);
	let data = countMix.split(":");
	let id = Number.parseInt(data[0]);
	let count = Number.parseInt(data[1]);
	return { id, count };
}

export function getBadgeById(id: number, list: string[]) {
	// console.log(id, list);
	let res = getItemById(id, list);
	if (res != undefined) {
		let { count } = partKv(res);
		return count;
	}
}
export function getItemById(id: number, list: string[]) {
	return list.filter(v => Number.parseInt(v.split(":")[0]) == id)[0];
}
