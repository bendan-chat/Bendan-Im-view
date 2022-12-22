import * as types from "@/redux/mutation-types";

// * setAuthRouter
export const setAuthRouter = (authRouter: string[]) => ({
	type: types.SET_AUTH_ROUTER,
	authRouter
});
