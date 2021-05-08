import {rootReducer} from "../store";
import {LOGIN_STATE} from "../stateConstants";
import { STORE_THREADS,UPDATE_TAGS,ADD_POST,STORE_THREAD_IDS,STORE_TAGS,ADD_REPLY,LOGIN_SUCCESS,
    INVALID_LOGIN,LOGIN_NETWORK_ERROR,LOGOUT,VIEW_ONLY } from "../actionConstants";
const TEST_STATE = {
    loginState: LOGIN_STATE.LOGGED_OUT,
    user: -1,
    threads: "",
    threadIds: [],
    tags: "",
    viewOnly: true
}

const LOGGED_IN_STATE = {
    loginState: LOGIN_STATE.LOGGED_IN,
    user: {
        username: "a.dumbledore",
        firstName: "Albus",
        lastName: "Dumbledore",
        email: "albus.dumbledore@hogwarts.edu",
        password: "albus"
    },
    threads: {
        "123": {
            author: "Albus Dumbledore",
            date: "Tue Apr 06",
            message: "Some yada yada",
            replies: [{
                    author: "Minerva McGonagall",
                    date: "Tue Apr 06",
                    message: "Yep"
            }],
            tags: {
                "0": "#cool"
            },
            title: "Wassup"
        }
    },
    threadIds: [],
    tags: {
        "1": {
            tag: "#wizards",
            threadIds: ["12345"]
        },
        "2": {
            tag: "#hogwarts",
            threadIds: ["123"]
        }
    },
    viewOnly: false

}

test("Successful login updates login state and user info", () => {
    const user = {
        username: "a.dumbledore",
        firstName: "Albus",
        lastName: "Dumbledore",
        email: "albus.dumbledore@hogwarts.edu",
        password: "albus"
    }

    const testAction = {
        type: LOGIN_SUCCESS,
        payload: {
            viewOnly: false,
            user: user
        }
    }

    const endState = {
        loginState: LOGIN_STATE.LOGGED_IN,
        user: {
            username: "a.dumbledore",
            firstName: "Albus",
            lastName: "Dumbledore",
            email: "albus.dumbledore@hogwarts.edu",
            password: "albus"
        },
        threads: "",
        threadIds: [],
        tags: "",
        viewOnly: false
    }

    expect(rootReducer(TEST_STATE, testAction)).toEqual(endState);
})

test("Unknown action type returns store unchanged", () => {
    expect(rootReducer(TEST_STATE, {})).toEqual(TEST_STATE);
})

test("Logout", () => {
    const testAction = {
        type: LOGOUT
    }

    const endState = {
        loginState: LOGIN_STATE.LOGGED_OUT,
        user: -1,
        threads: "",
        threadIds: [],
        tags: "",
        viewOnly: true
    }

    expect(rootReducer(TEST_STATE, testAction)).toEqual(endState);
})

test("Logout resets the store to defaults", () => {
    const testAction = {
        type: LOGOUT
    }

    expect(rootReducer(LOGGED_IN_STATE, testAction)).toEqual(TEST_STATE);
})

test("Invalid login sets the login state to INVALID_LOGIN", () => {
    const testAction =  {
        type:  INVALID_LOGIN
    }

    const endState = {
        loginState: LOGIN_STATE.INVALID_LOGIN,
        user: -1,
        threads: "",
        threadIds: [],
        tags: "",
        viewOnly: true
    }

    expect(rootReducer(TEST_STATE, testAction)).toEqual(endState);
})


test("Store threads", () => {

    const testAction = {
        type: STORE_THREADS,
        payload: { 
            threads: {
                "124": {
                author: "Albus Dumbledore",
                date: "Tue Apr 06",
                message: "Some yada yada",
                replies: [{
                        author: "Someone else",
                        date: "Tue Apr 06",
                        message: "Yep"
                    
                }],
                tags: {
                    "0": "#cool"
                },
                title: "Wassup"
            }
        }
        }
    }

    const endState = {
        loginState: LOGIN_STATE.LOGGED_IN,
        user: {
            username: "a.dumbledore",
            firstName: "Albus",
            lastName: "Dumbledore",
            email: "albus.dumbledore@hogwarts.edu",
            password: "albus"
        },
        threads: {
            "124": {
            author: "Albus Dumbledore",
            date: "Tue Apr 06",
            message: "Some yada yada",
            replies: [{
                    author: "Someone else",
                    date: "Tue Apr 06",
                    message: "Yep"
                }
            ],
            tags: {
                "0": "#cool"
            },
            title: "Wassup"
            }
        },
        threadIds: [],
        tags: {
            "1": {
                tag: "#wizards",
                threadIds: ["12345"]
            },
            "2": {
                tag: "#hogwarts",
                threadIds: ["123"]
            }
        },
        viewOnly: false
    }

    expect(rootReducer(LOGGED_IN_STATE, testAction)).toEqual(endState);
})

test("Update tags after a new post is added", () => {

    const testAction = {
        type: UPDATE_TAGS,
        payload: { 
            tagId: "3",
            postId: "123",
            tag: "#cool"
            
        }
    }

    const endState = {
        loginState: LOGIN_STATE.LOGGED_IN,
    user: {
        username: "a.dumbledore",
        firstName: "Albus",
        lastName: "Dumbledore",
        email: "albus.dumbledore@hogwarts.edu",
        password: "albus"
    },
    threads: {
        "123": {
            author: "Albus Dumbledore",
            date: "Tue Apr 06",
            message: "Some yada yada",
            replies: [{
                    author: "Minerva McGonagall",
                    date: "Tue Apr 06",
                    message: "Yep"
                
            }],
            tags: {
                "0": "#cool"
            },
            title: "Wassup"
        }
    },
    threadIds: [],
        tags: {
            "1": {
                tag: "#wizards",
                threadIds: ["12345"]
            },
            "2": {
                tag: "#hogwarts",
                threadIds: ["123"]
            },
            "3": {
                tag: "#cool",
                threadIds: ["123"]
            }
        },
        viewOnly: false
    }


    expect(rootReducer(LOGGED_IN_STATE, testAction)).toEqual(endState);
})

test("Add a new post", () => {

    const testAction = {
        type: ADD_POST,
        payload: {
            postId: "124",
            post: {
                author: "Harry Potter",
                date: "Tue Apr 06",
                message: "Some yada yada",
                replies: [{
                        author: "Minerva McGonagall",
                        date: "Tue Apr 06",
                        message: "No"
                    }
                ],
                tags: {
                    "0": "#please"
                },
                title: "Permission"
            }
        }
    }

    const endState = {
        loginState: LOGIN_STATE.LOGGED_IN,
    user: {
        username: "a.dumbledore",
        firstName: "Albus",
        lastName: "Dumbledore",
        email: "albus.dumbledore@hogwarts.edu",
        password: "albus"
    },
    threads: {
        "123": {
            author: "Albus Dumbledore",
            date: "Tue Apr 06",
            message: "Some yada yada",
            replies: [{
                    author: "Minerva McGonagall",
                    date: "Tue Apr 06",
                    message: "Yep"
                }
            ],
            tags: {
                "0": "#cool"
            },
            title: "Wassup"
        },
        "124": {
            author: "Harry Potter",
            date: "Tue Apr 06",
            message: "Some yada yada",
            replies: [{
                    author: "Minerva McGonagall",
                    date: "Tue Apr 06",
                    message: "No"
                }
            ],
            tags: {
                "0": "#please"
            },
            title: "Permission"
        }
    },
    threadIds: [],
        tags: {
            "1": {
                tag: "#wizards",
                threadIds: ["12345"]
            },
            "2": {
                tag: "#hogwarts",
                threadIds: ["123"]
            }
        },
        viewOnly: false
    }

    expect(rootReducer(LOGGED_IN_STATE, testAction)).toEqual(endState);
})

test("Store the threadIds for a specific tag", () => {

    const testAction = {
        type: STORE_THREAD_IDS,
        payload: {
            threadIds: ["123"]
        }
    }

    const endState = {
        loginState: LOGIN_STATE.LOGGED_IN,
    user: {
        username: "a.dumbledore",
        firstName: "Albus",
        lastName: "Dumbledore",
        email: "albus.dumbledore@hogwarts.edu",
        password: "albus"
    },
    threads: {
        "123": {
            author: "Albus Dumbledore",
            date: "Tue Apr 06",
            message: "Some yada yada",
            replies: [{
                    author: "Minerva McGonagall",
                    date: "Tue Apr 06",
                    message: "Yep"
                }
            ],
            tags: {
                "0": "#cool"
            },
            title: "Wassup"
        }
    },
    threadIds: ["123"],
    tags: {
        "1": {
            tag: "#wizards",
            threadIds: ["12345"]
        },
        "2": {
            tag: "#hogwarts",
            threadIds: ["123"]
        }
    },
    viewOnly: false
}

    expect(rootReducer(LOGGED_IN_STATE, testAction)).toEqual(endState);
})

test("Store new tags", () => {

    const testAction = {
        type: STORE_TAGS,
        payload: {
            tags: {
                "1": {
                    tag: "#wizards",
                    threadIds: ["12345"]
                },
                "2": {
                    tag: "#hogwarts",
                    threadIds: ["123"]
                },
                "3": {
                    tag: "#hagridrocks",
                    threadIds: ["124"]
                }
            }
        }
    }

    const endState = {
        loginState: LOGIN_STATE.LOGGED_IN,
    user: {
        username: "a.dumbledore",
        firstName: "Albus",
        lastName: "Dumbledore",
        email: "albus.dumbledore@hogwarts.edu",
        password: "albus"
    },
    threads: {
        "123": {
            author: "Albus Dumbledore",
            date: "Tue Apr 06",
            message: "Some yada yada",
            replies: [{
                    author: "Minerva McGonagall",
                    date: "Tue Apr 06",
                    message: "Yep"
                }
            ],
            tags: {
                "0": "#cool"
            },
            title: "Wassup"
        }
    },
    threadIds: [],
    tags: {
        "1": {
            tag: "#wizards",
            threadIds: ["12345"]
        },
        "2": {
            tag: "#hogwarts",
            threadIds: ["123"]
        },
        "3": {
            tag: "#hagridrocks",
            threadIds: ["124"]
        }
    },
    viewOnly: false
}

    expect(rootReducer(LOGGED_IN_STATE, testAction)).toEqual(endState);
})

test("Add a reply to a thread", () => {

    const testAction = {
        type: ADD_REPLY,
        payload: {
            threadId: "123",
            reply: {
                message: "tough",
                date:  "Fri Apr 09",
                author:  "Pinkie Chimichanga",
            }
        }
    }

    const endState = {
        loginState: LOGIN_STATE.LOGGED_IN,
    user: {
        username: "a.dumbledore",
        firstName: "Albus",
        lastName: "Dumbledore",
        email: "albus.dumbledore@hogwarts.edu",
        password: "albus"
    },
    threads: {
        "123": {
            author: "Albus Dumbledore",
            date: "Tue Apr 06",
            message: "Some yada yada",
            replies: [
                
                {
                    author: "Minerva McGonagall",
                    date: "Tue Apr 06",
                    message: "Yep"
                },
                {
                    message: "tough",
                    date:  "Fri Apr 09",
                    author:  "Pinkie Chimichanga",
                }
            
            ],
            tags: {
                "0": "#cool"
            },
            title: "Wassup"
        }
    },
    threadIds: [],
    tags: {
        "1": {
            tag: "#wizards",
            threadIds: ["12345"]
        },
        "2": {
            tag: "#hogwarts",
            threadIds: ["123"]
        }
    },
    viewOnly: false
}

    expect(rootReducer(LOGGED_IN_STATE, testAction)).toEqual(endState);
})