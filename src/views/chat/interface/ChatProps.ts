export namespace ChatProps {
	export interface CommonProps {
		msg?: string;
		avatar: string;
	}
	export interface VoiceProps extends CommonProps {
		len: number;
	}
	export interface FileProps extends CommonProps {
		fileName: string;
		size: number;
	}
}
