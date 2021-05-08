
import { LOGIN_SUCCESS,ADD_POST,UPDATE_TAGS,INVALID_LOGIN,LOGIN_NETWORK_ERROR,LOGOUT,STORE_THREADS,STORE_TAGS,ADD_REPLY } from "../actionConstants";
import {loginSuccess, loginFail, loginNetworkError, logout, validateUser, getThreads, getTags, getThreadsByTag,
    addReply, addTags, addPost} from "../actions";
import * as actions from "../actions";

test("Create login success action", () => {
    const user = {id: 200}

    const expectedAction = {
        type: LOGIN_SUCCESS,
        payload: {
            viewOnly: false,
            user: user
        }
    }
    expect(loginSuccess(user)).toEqual(expectedAction);
})

test("Create invalid login action", () => {
    const expectedAction = {type: INVALID_LOGIN};
    expect(loginFail()).toEqual(expectedAction);
})

test("Create a network error action", () => {
    const expectedAction = {type: LOGIN_NETWORK_ERROR};
    expect(loginNetworkError()).toEqual(expectedAction);
})

test("Create a logout action", () => {
    const expectedAction = {type: LOGOUT};
    expect(logout()).toEqual(expectedAction);
})

test("Valid user login creates login success action", () => {
    
    const user = {
        username: "a.dumbledore",
        firstName: "Albus",
        lastName: "Dumbledore",
        email: "albus.dumbledore@hogwarts.edu",
        password: "albus"
    }

    const expectedAction = {
        type: LOGIN_SUCCESS,
        payload: {
            user: user
        }
    }

    jest.spyOn(actions, "validateUser").mockImplementation(() => ({
        type: LOGIN_SUCCESS,
        payload: {
            user: {
                username: "a.dumbledore",
                firstName: "Albus",
                lastName: "Dumbledore",
                email: "albus.dumbledore@hogwarts.edu",
                password: "albus"
            }
        }
    }));
    expect(validateUser("a.dumbledore", "albus")).toEqual(expectedAction);
})

test("Invalid user login creates login fail action", () => {
    const expectedAction = {type: INVALID_LOGIN};

    jest.spyOn(actions, "validateUser").mockImplementation(() => ({
        type: INVALID_LOGIN
    }));

    expect(validateUser("", "")).toEqual(expectedAction);
})

test("Get all the threads", () => {

    const threads = {
        "123": {
            author: "Albus Dumbledore",
            date: "Tue Apr 06",
            message: "Some yada yada",
            replies: {
                "0": {
                    author: "Minerva McGonagall",
                    date: "Tue Apr 06",
                    message: "Yep"
                }
            },
            tags: {
                "0": "#cool"
            },
            title: "Wassup"
        }
    }

    const expectedAction = {
        type: STORE_THREADS,
        payload: {
            threads: threads
        }};

    jest.spyOn(actions, "getThreads").mockImplementation(() => ({
        type: STORE_THREADS,
        payload: {
            threads: threads
        }
    }));

    expect(getThreads()).toEqual(expectedAction);
})

test("Get all the tags", () => {

    const tags = {
        "1": {
            tag: "#wizards",
            threadIds: "12345"
        }
    }

    const expectedAction = {
        type: STORE_TAGS,
        payload: {
            tags: tags
        }
      }

    jest.spyOn(actions, "getTags").mockImplementation(() => ({
        type: STORE_TAGS,
        payload: {
            tags: tags
        }
    }))
    expect(getTags()).toEqual(expectedAction);
})

test("Get all the threads specific to a tag", () => {

    const threads = {
        "123": {
            author: "Albus Dumbledore",
            date: "Tue Apr 06",
            message: "Some yada yada",
            replies: {
                "0": {
                    author: "Minerva McGonagall",
                    date: "Tue Apr 06",
                    message: "Yep"
                }
            },
            tags: {
                "0": "#cool"
            },
            title: "Wassup"
        }
    }

    const expectedAction = {
    
        type: STORE_THREADS,
        payload: {
            threads: threads
        }
      }

    jest.spyOn(actions, "getThreadsByTag").mockImplementation(() => ({
    
        type: STORE_THREADS,
        payload: {
            threads: threads
        }
      }))

    expect(getThreadsByTag("#cool")).toEqual(expectedAction);
})

test("Add a reply", () => {

    const threadId = "123"

    const reply = {
        message: "tough",
        date:  "Fri Apr 09",
        author:  "Pinkie Chimichanga",
    }

    const expectedAction = {
        type: ADD_REPLY,
        payload: {
            threadId: threadId,
            reply: reply
        }
      }

    jest.spyOn(actions, "addReply").mockImplementation(() => ({
        type: ADD_REPLY,
        payload: {
            threadId: threadId,
            reply: reply
        }
    }))

    expect(addReply({
        message: "tough",
        date:  "Fri Apr 09",
        author:  "Pinkie Chimichanga",
    }, "123")).toEqual(expectedAction);
})

test("Add a tag", () => {

    const tagId = {
        "1": {
            tag: "#wizards",
            threadIds: "12345"
        },
        "2": {
            tag: "#hogwarts",
            threadIds: "123"
        }
    }

    const tag = "#hogwarts"

    const postId = "123"

    const postTags = ["#hogwarts"]

    const expectedAction = {
        type: UPDATE_TAGS,
        payload: {
          tagId: tagId,
          postId: postId,
          tag: tag
        }
      }

    jest.spyOn(actions, "addTags").mockImplementation(() => ({
        type: UPDATE_TAGS,
        payload: {
          tagId: tagId,
          postId: postId,
          tag: tag
        }
      }))

    expect(addTags(postId, postTags, {
        "1": {
            tag: "#wizards",
            threadIds: "12345"
        }
    })).toEqual(expectedAction);
})

test("Add a post", () => {

    const post = {
        "124": {
            author: "Minerva McGonagall",
            date: "Tue Apr 06",
            message: "Some yada yada",
            replies: {
                "0": {
                    author: "Severus Snape",
                    date: "Tue Apr 06",
                    message: "..."
                }
            },
            tags: {
                "0": "#logistics"
            },
            title: "Logistics"
        }
    }

    const tags = {
        "1": {
            tag: "#wizards",
            threadIds: "12345"
        },
        "2": {
            tag: "#hogwarts",
            threadIds: "123"
        }
    }

    const threads = {
        "123": {
            author: "Albus Dumbledore",
            date: "Tue Apr 06",
            message: "Some yada yada",
            replies: {
                "0": {
                    author: "Minerva McGonagall",
                    date: "Tue Apr 06",
                    message: "Yep"
                }
            },
            tags: {
                "0": "#cool"
            },
            title: "Wassup"
        }
    }

    const postId = "123"

    const expectedAction = {
    
        type: ADD_POST,
        payload: {
            postId: postId,
            post: post
        }
      }

    jest.spyOn(actions, "addPost").mockImplementation(() => ({
    
        type: ADD_POST,
        payload: {
            postId: postId,
            post: post
        }
      }))

    expect(addPost(post, tags, threads)).toEqual(expectedAction);
})