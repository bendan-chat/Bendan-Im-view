// * 请求响应参数(包含data)
export interface Result {
	success: boolean;
	code: number;
	msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T> extends Result {
	data: T;
}

// * 分页响应
export interface ResPage<T> {
	items: T[];
	total: number;
}

// * 分页请求参数
export interface ReqPage {
	cur: number;
	limit: number;
	orderField?: string;
	order: boolean;
}
