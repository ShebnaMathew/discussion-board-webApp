export const LOGIN_STATE = {
    LOGGED_IN: "logged in",
    LOGGED_OUT: "logged out",
    INVALID_LOGIN: "invalid login",
    NETWORK_ERROR: "network error"
}

export const INITIAL_STATE = {
    loginState: LOGIN_STATE.LOGGED_OUT,
    user: -1,
    threads: "",
    threadIds: [],
    tags: "",
    viewOnly: true
}