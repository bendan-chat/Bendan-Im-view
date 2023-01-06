import * as types from "@/redux/mutation-types";

// * setAvatar
export const setToAvatar = (toAvatar: string) => ({
	type: types.SET_TO_AVATAR,
	toAvatar
});
