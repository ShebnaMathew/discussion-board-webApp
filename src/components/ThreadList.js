import {useSelector} from "react-redux";
import {useState} from "react"
import Thread from "./Thread"
import AddPost from "./AddPost";

const ThreadList = (props) => {
    const threads = useSelector(state => state.threads);
    const threadIds = useSelector(state => state.threadIds);
    const [current, setCurrent] = useState("");
    const [content, setContent] = useState("");
    const [id,setId] = useState("");

    const ids = Object.keys(threads);

    const updateContent = (currentId) => {
        setCurrent(threads[currentId])
        setContent(threads[currentId].replies)
        setId(currentId)
    }

    return (
    <div id="posts">
    <div class="grid-container listing">
            <div class="grid-child list-group">
            { 
                ids.map((currentId,i) => 
                    ((threadIds.length === 0) || (threadIds.length>0 && threadIds.includes(currentId)))?
                    (
                        <button type="button" class="list-group-item list-group-item-action"
                        aria-current={(i===0)?"true":"false"} id={i} onClick={(e) => updateContent(currentId)}>
                            <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">{threads[currentId].title}</h5>
                            <small>{threads[currentId].date}</small>
                            </div>
                            <p class="mb-1">{threads[currentId].message.slice(0,120)}</p>
                            <small>{threads[currentId].author}</small>
                        </button>
            ):"", threads)
        }
        </div>
        <div class="grid-child">
            {(props.newPost)?<AddPost newPost={props.newPost} updatePost={props.updatePost}/>
            :(content)?<Thread post={current} content={content} id={id} loggedIn={props.loggedIn}/>:""}
        </div>
    </div>
    </div>
    
    )
}

export default ThreadList;