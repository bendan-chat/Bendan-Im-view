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
