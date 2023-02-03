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
		userId: number;
		avatar: string;
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

export namespace Account {
	export interface FriendUser {
		/**
		 * 昵称
		 */
		id: number;
		/**
		 * username
		 */
		username: string;
		/**
		 * 昵称
		 */
		nickName?: String;
		/**
		 * 头像
		 */
		avatar?: String;
		/**
		 * 性别   (-1 未知 0 女性  1 男性)
		 */
		gender: -1 | 0 | 1;
	}
	export interface ChatUser {
		/**
		 * 昵称
		 */
		id: number;
		/**
		 * 昵称
		 */
		nickName?: String;
		/**
		 * 头像
		 */
		avatar?: String;
		/**
		 * 性别   (-1 未知 0 女性  1 男性)
		 */
		gender: -1 | 0 | 1;
		/**
		 * 最后一条消息
		 */
		lastMsg: string;
	}
	export interface UserInfo {
		/**
		 * 用户ID
		 */
		id?: number;

		/**
		 * 用户名称
		 */
		username?: String;

		/**
		 * 昵称
		 */
		nickName?: String;

		/**
		 * 个人描述
		 */
		selfDescription?: String;

		/**
		 * 手机号
		 */
		phoneNumber?: String;

		/**
		 * 头像
		 */
		avatar?: String;

		/**
		 * 邮箱
		 */
		email?: String;
		/**
		 * 状态（0-正常  1-锁定  2-删除）
		 */
		status?: number;
		/**
		 * 性别   (-1 未知 0 女性  1 男性)
		 */
		gender?: number;

		/**
		 * 创建人ID
		 */
		createId?: number;

		/**
		 * 修改人ID
		 */
		updateId?: number;

		/**
		 * 创建时间
		 */
		createTime?: String;

		/**
		 * 更新时间
		 */
		updateTime?: String;
	}
}
