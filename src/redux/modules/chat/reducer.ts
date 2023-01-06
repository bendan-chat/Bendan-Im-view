import { AnyAction } from "redux";
import { ChatState } from "@/redux/interface";
import produce from "immer";
import * as types from "@/redux/mutation-types";

const chatState: ChatState = {
	toAvatar: ""
};

// auth reducer
const chat = (state: ChatState = chatState, action: AnyAction) =>
	produce(state, draftState => {
		switch (action.type) {
			case types.SET_TO_AVATAR:
				draftState.toAvatar = action.toAvatar;
				break;
			default:
				return draftState;
		}
	});

export default chat;
