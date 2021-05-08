import { useSelector,useDispatch } from "react-redux"
import ThreadList from "../components/ThreadList"
import Login from "../components/Login"
import { getThreads, getTags, storeThreadIds,logout,viewOnly } from "../redux/actions";
import { useState } from "react";
import { INITIAL_STATE, LOGIN_STATE } from "../redux/stateConstants";

const Home = () => {
    
    const user = useSelector(state => state.user);
    const loggedIn = useSelector(state => state.loginState);
    const isViewOnly = useSelector(state => state.viewOnly);
    const tags = useSelector(state => state.tags);
    const threads = useSelector(state => state.threads);
    const [addPost, setAddPost] = useState(false);

    const ids = Object.keys(tags);

    const dispatch = useDispatch();
    console.log("home tags: ", tags)

    if (threads === INITIAL_STATE.threads){
        dispatch(getThreads());
    }

    if (tags === INITIAL_STATE.tags) {
        dispatch(getTags());
    }
    
    const toggleLogin = () => {
        (loggedIn === LOGIN_STATE.LOGGED_IN) ?
        dispatch(logout()):
        dispatch(viewOnly(false))
    }

    const handleThread = (id) => {
        const threadIds = tags[id].threadIds
        const threadsByTag = []
        threadIds.forEach(i => {
            threadsByTag.push(i)
        });
        console.log("threads by tag: ", threadsByTag)
        dispatch(storeThreadIds(threadsByTag))
    }

    const toggleView = () => {
        dispatch(storeThreadIds([]))
    }

    if(isViewOnly || loggedIn === LOGIN_STATE.LOGGED_IN) {
        return(
            
            <div id="home">
                <nav className="navbar navbar-dark">
                    <div className="container-fluid">
                        <label class="d-flex name">{(!isViewOnly)?user.firstName:""}</label>
                        <a className="navbar-brand mx-auto font title" href="#home" onClick={toggleView}>
                                The Hogwarts Gazette
                        </a>
                        <form class="d-flex">
                        <button type="button" class="btn btn-outline-light" onClick={toggleLogin}>
                            {(loggedIn !== LOGIN_STATE.LOGGED_IN)? "Login":"Logout"}
                        </button>
                        </form>
                    </div>
                </nav>
                <ul class="nav">
                    {(loggedIn === LOGIN_STATE.LOGGED_IN)?
                    <li class="nav-item">
                        <button type="button" className="nav-link active option action" aria-current="page" value="New Post"
                        onClick={(e) => setAddPost(true)}>New Post</button>
                    </li>:""
                    }
                    <li class="nav-item">
                        <a className="nav-link tag" href="#home">tags:</a>
                    </li>
                    {
                    ids.map((id) => 
                        <li class="nav-item">
                            <button type="button" className="nav-link active option" aria-current="page" value={tags[id].tag}
                            onClick={(e) => handleThread(id)}>{tags[id].tag}</button>
                        </li>
                        , tags)
                    }
                </ul>
                <ThreadList newPost={addPost} updatePost={setAddPost} loggedIn={loggedIn === LOGIN_STATE.LOGGED_IN}/>
            </div>
        )
    }
    else {
        return <Login />
    }
}

export default Home