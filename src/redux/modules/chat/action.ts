import { Account } from "@/api/interface/user";
import * as types from "@/redux/mutation-types";

// * setFriends
export const setFriends = (friends: Account.ChatUser[]) => ({
	type: types.SET_CHAT_FRIENDS,
	friends
});
