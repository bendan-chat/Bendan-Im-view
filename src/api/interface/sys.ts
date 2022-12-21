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

// * 分页响应参数
export interface ResPage<T> {
	datalist: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}

// * 分页请求参数
export interface ReqPage {
	cur: number;
	limit: number;
	orderField?: string;
	order: string;
}

// * 登录
export namespace Login {
	export interface ReqLoginForm {
		username: string;
		password: string;
	}
	export interface Res {
		oauth2AccessTokenResponse?: Oauth2AccessTokenResponse;
		accessTokenExpiresIn?: number;
		refreshExpiresIn?: number;
	}
	interface Oauth2AccessTokenResponse {
		accessToken?: Token;
		refreshToken?: Token;
		additionalParameters?: {};
	}
	interface Token {
		tokenValue?: string;
		issuedAt?: number;
		expiresAt?: number;
		tokenType?: {
			value?: string;
		};
		scopes?: string[];
	}
}
