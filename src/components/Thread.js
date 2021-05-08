
import {useState} from "react";
import {useSelector,useDispatch} from "react-redux";
import {  addReply} from "../redux/actions";

const Thread = (props) => {

    const user = useSelector(state => state.user);
    const [reply, setReply] = useState("");
    const dispatch = useDispatch();
    
    let d = new Date();

    const updateReply = text => {
        setReply(text);
    }

    const onSubmit = () => { 
        if (reply.length !== 0){
            dispatch(addReply({
                message: reply,
                date:  d.toDateString().slice(0,-4),
                author:  user.firstName + " " + user.lastName,
                },props.id));
            clearForm();
        }
    }

    const clearForm = () => {
        setReply("");
    }

    return(
        <div class="list-group">
        <a href="#home" class="list-group-item list-group-item-action post">
            <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{props.post.title}</h5>
            <small class="text-muted">{props.post.date}</small>
            </div>
            <p class="mb-1">{props.post.message}</p>
            <p class="mb-1">{props.post.tags}</p>
            <small class="text-muted">{props.post.author}</small>
        </a>
        {
            props.content.map((each) =>

            <a href="#home" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-1 user">{each.author}</h6>
                <small class="text-muted">{each.date}</small>
                </div>
                <p class="mb-1">{each.message}</p>
            </a>
            )
        }
        {(props.loggedIn)?
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Add a reply" aria-label="Add a reply" 
            aria-describedby="button-addon2" value={reply} onChange={e => updateReply(e.target.value)}/>
            <button class="btn btn-secondary" type="button" id="button-addon2" onClick={onSubmit}>Submit</button>
        </div>:""}
        </div>
        
    )
}

export default Thread;