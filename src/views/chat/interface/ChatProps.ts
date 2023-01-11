export namespace ChatProps {
	export interface CommonProps {
		msg: string;
		avatar: string;
	}
	export interface voiceProps extends CommonProps {
		len: number;
	}
}
