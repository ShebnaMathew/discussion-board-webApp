import { LOGIN_SUCCESS, ADD_POST,UPDATE_TAGS,INVALID_LOGIN, LOGIN_NETWORK_ERROR,LOGOUT,VIEW_ONLY,STORE_THREADS,
  STORE_THREAD_IDS,STORE_TAGS,ADD_REPLY } from "./actionConstants";
import firebase from "../fbConfig";

const database = firebase.firestore();

export const loginSuccess = user => ({
    type: LOGIN_SUCCESS,
    payload: {
        viewOnly: false,
        user: user
    }
});

export const loginFail = () => ({
    type: INVALID_LOGIN
});

export const loginNetworkError = () => ({
    type: LOGIN_NETWORK_ERROR
});

export const logout = () => ({
    type: LOGOUT
});

export const viewOnly = (view) => ({
    type: VIEW_ONLY,
    payload: {
        viewOnly: view
    }
})

const storeThreads = threads => ({
    
  type: STORE_THREADS,
  payload: {
      threads: threads
  }
})

const updateThreads = (postId, post) => ({
    
  type: ADD_POST,
  payload: {
      postId: postId,
      post: post
  }
})

export const storeThreadIds = threadIds => ({
  
  type: STORE_THREAD_IDS,
  payload: {
      threadIds: threadIds
  }
})

const storeTags = (tags) => ({
  type: STORE_TAGS,
  payload: {
      tags: tags
  }
})

const updateTags = (tagId, postId, tag) => ({
  type: UPDATE_TAGS,
  payload: {
    tagId: tagId,
    postId: postId,
    tag: tag
  }
})

const updateReply = (threadId, reply) => ({
  type: ADD_REPLY,
  payload: {
      threadId: threadId,
      reply: reply
  }
})

export const validateUser = (username, password) => {
  
    return dispatch => {
        database.collection("users").where("username","==",username).where("password","==",password)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.size === 1) {
              const doc = querySnapshot.docs[0];
              dispatch(loginSuccess(doc.data()));
            } else {
              dispatch(loginFail());
            }
        }).catch(error => {
            console.log("Error logging in.", error)
        });
    }
}

export const getThreads = () => {
    return dispatch => {
      database.collection("threads")
        .get() 
        .then((querySnapshot) => {
          if (querySnapshot.size > 0) {
            const threads = {};
            querySnapshot.forEach(doc => {
              threads[doc.id] = {
                title:doc.data().title,
                message:doc.data().message,
                tags:doc.data().tags,
                date: doc.data().date,
                author: doc.data().author,
                replies: doc.data().replies
              }
            })
            dispatch(storeThreads(threads));
          }
          else {
            console.log("No threads available.") 
          }
        })
        .catch(error => {
          console.log("Error fetching threads.", error)
        });
    }
  };

  export const getTags = () => {
    return dispatch => {
      database.collection("tags")
        .get()  
        .then((querySnapshot) => {
          if (querySnapshot.size > 0) {
            const tags = {};
            querySnapshot.forEach(doc => {
              tags[doc.id] = {
                tag:doc.data().tag,
                threadIds:doc.data().threadIds
              }
            })
            dispatch(storeTags(tags));
          }
          else {
            console.log("No tags available.") 
          }
        })
        .catch(error => {
          console.log("Error fetching tags.", error)
        });
    }
  };

  export const getThreadsByTag = (threadIds) => {
    return dispatch => {
      database.collection("threads")
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size > 0) {
            const threads = {};
            querySnapshot.forEach(doc => {
              if (threadIds.includes(doc.id)){
                threads[doc.id] = {
                  title:doc.data().title,
                  message:doc.data().message,
                  tags:doc.data().tags,
                  date: doc.data().date,
                  author: doc.data().author,
                  replies: doc.data().replies
                }
              }
            })
            dispatch(storeThreads(threads));
          }
          else {
            console.log("No threads available for that tag.") 
          }
        })
        .catch(error => {
          console.log("Error fetching tagged thread(s).", error)
        });
    }
  };

  export const addReply = (reply, threadId) => {
    return dispatch => {
      database.collection("threads").doc(threadId)
        .update({
          replies: firebase.firestore.FieldValue.arrayUnion(reply)
        })
        .then(() => {
            dispatch(updateReply(threadId, reply));
        })
        .catch(error => {
          console.log("Could not add the reply.",error);
        })
    }
  }

  export const addTags = (postId, postTags, tags) => {

    return dispatch => {

        const tagList = []
        const docList = []
        var tagId;

        for (var each in tags) {
          tagList.push(tags[each].tag)
          docList.push(each)
        }
        
        postTags.forEach((tag) => {
          if(tagList.includes(tag)){
            var idx = tagList.indexOf(tag)
            database.collection("tags").doc(docList[idx])
                    .update({
                              threadIds: firebase.firestore.FieldValue.arrayUnion(postId)
                          })
                    .then(() => {
                              tagId = docList[idx]
                              dispatch(updateTags(tagId, postId, tag));
                          })
                    .catch(error => {
                        console.log("Could not add to the existing tag.", error);
                          })
          }
          else {
            const newTag = database.collection("tags").doc()
            newTag.set({
                        tag: tag,
                        threadIds: [postId]
                      })
                  .then(() => {
                        tagId = newTag.id
                        dispatch(updateTags(tagId,postId,tag));
                      })
                  .catch(error => {
                        console.log("Could not add the new tag");
                      })
          }
      })
    }
  }

  export const addPost = (post, tags, threads) => {
    return dispatch => {
      const newPost = database.collection("threads").doc();
        newPost.set(post)
        .then(() => {
            dispatch(updateThreads(newPost.id, post));
            if(post.tags.length !== 0 || (post.tags.length === 1 && post.tags[0]!=="")){
            dispatch(addTags(newPost.id, post.tags, tags))
            }
        })
        .catch(error => {
          console.log("Could not add the post.", error);
        })
    }
  }