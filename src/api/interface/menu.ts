export namespace Menus {
	export interface MenuParams {
		id: number;
		level?: number;
		parentId: number;
		path?: string;
		purviewName?: string;
		sort: number;
		status: number;
		icon?: string;
		title: string;
		updateId?: number;
		createId?: number;
		createTime?: string;
		updateTime?: string;
		children?: MenuParams[];
	}

	export interface ResAuthButtons {
		[propName: string]: any;
	}
}
