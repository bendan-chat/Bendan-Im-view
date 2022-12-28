import { AnyAction } from "redux";
import { FriendsState } from "@/redux/interface";
import produce from "immer";
import * as types from "@/redux/mutation-types";

const friendsState: FriendsState = {
	friends: []
};

// auth reducer
const chat = (state: FriendsState = friendsState, action: AnyAction) =>
	produce(state, draftState => {
		switch (action.type) {
			case types.SET_CHAT_FRIENDS:
				draftState.friends = action.friends;
				break;
			default:
				return draftState;
		}
	});

export default chat;
