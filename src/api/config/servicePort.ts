// 后端微服务端口名

// admin
export namespace adminServer {
	export const User = "/admin/sysUser";
	export const Menu = "/admin/sysMenu";
	export const Chat = "/admin/chat";
}

// chat
export namespace ChatServer {
	export const Record = "/chat/record";
}

// Oss
export namespace Oss {
	export const Upload = "/oss/file";
}
