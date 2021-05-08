import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import {INITIAL_STATE,LOGIN_STATE} from "./stateConstants";
import { STORE_THREADS,UPDATE_TAGS,ADD_POST,STORE_THREAD_IDS,STORE_TAGS,ADD_REPLY,LOGIN_SUCCESS,
    INVALID_LOGIN,LOGIN_NETWORK_ERROR,LOGOUT,VIEW_ONLY } from "./actionConstants";

export const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginState: LOGIN_STATE.LOGGED_IN,
                user: action.payload.user,
                viewOnly: action.payload.viewOnly
            }
        case INVALID_LOGIN:
            return {...state, loginState: LOGIN_STATE.INVALID_LOGIN};
        case LOGIN_NETWORK_ERROR:
            return {...state, loginState: LOGIN_STATE.NETWORK_ERROR};
        case VIEW_ONLY:
            return {...state, viewOnly: action.payload.viewOnly};
        case STORE_THREADS:
            return {...state, threads: action.payload.threads};
        case STORE_THREAD_IDS:
            return {...state, threadIds: action.payload.threadIds};
        case STORE_TAGS:
            return {...state, tags: action.payload.tags};
        case UPDATE_TAGS:
            const existingTags = {...state.tags};
            if((action.payload.tagId) in existingTags) {
                existingTags[action.payload.tagId].threadIds.push(action.payload.postId)
            } else {
                existingTags[action.payload.tagId] = 
                {   tag: action.payload.tag,
                    threadIds: [action.payload.postId]
                }
            }
            return {...state, tags: existingTags};
        case ADD_POST:
            const existingThreads = {...state.threads};
            existingThreads[action.payload.postId] = action.payload.post;
            return {...state, threads: existingThreads};
        case ADD_REPLY:
            const currentThreads = {...state.threads};
            const updated = currentThreads[action.payload.threadId];
            updated.replies.push(action.payload.reply);
            return {...state,
                threads:currentThreads
            }
        case LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));