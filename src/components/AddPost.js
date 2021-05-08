import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import { addPost } from "../redux/actions";

const AddPost = (props) => {

    const threads = useSelector(state => state.threads);
    const currentTags = useSelector(state => state.tags);
    const user = useSelector(state => state.user);

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [tags, setTags] = useState("");
    const [noTitle, setNoTitle] = useState(false);

    const dispatch = useDispatch();

    let d = new Date();

    const updateTitle = text => {
        setTitle(text);
        setNoTitle(false);
    }

    const updateMessage = text => {
        setMessage(text);
    }

    const updateTags = tagsList => {
        // separate tags by whitespace
        setTags(tagsList.split(/\s+/));
    }

    const onSubmit = () => { 
        if (title.length === 0)
            {setNoTitle(true);}
        else {
            
            dispatch(addPost({title: title,
                message: message,
                tags: tags,
                date:  d.toDateString().slice(0,-4),
                author:  user.firstName + " " + user.lastName,
                replies: []}, currentTags, threads));
            props.updatePost(false)
            clearForm();
        }
    }

    const clearForm = () => {
        setTitle("");
        setMessage("");
        setNoTitle(true);
    }

    return (
        <div className="container">
            <h3>Add a new post</h3>
            {
                noTitle ?
                    <div className="alert alert-danger" role="alert">Please input a Title</div> : ""
            }
            <div className="row my-2">
                <label className="col-sm-3 col-form-label" htmlFor="selectCategory">Title:</label>
                <div className="col-sm-9">
                <input type="text" class="form-control" placeholder="Title" aria-label="Title" aria-describedby="basic-addon1" 
                onChange={e => updateTitle(e.target.value)}/>

                </div>
            </div>
            <div className="row my-2">
                <label className="col-sm-3 col-form-label" htmlFor="comment">Message:</label>
                <div className="col-sm-9">
                    <textarea className="form-control" id="comment" 
                        value={message}
                        onChange={e => updateMessage(e.target.value)} />
                </div>
            </div>
            <div className="row my-2">
                <label className="col-sm-3 col-form-label" htmlFor="selectCategory">Tags:</label>
                <div className="col-sm-9">
                <input type="text" class="form-control" placeholder="Tags (Every tag starts with a # and multiple tags can be separated by whitespace)" aria-label="Tags" aria-describedby="basic-addon1" 
                onChange={e => updateTags(e.target.value)}/>

                </div>
            </div>
            <div className="my-2">
                <div className="text-end">
                    <button className="btn btn-primary" onClick={onSubmit}>Submit</button>
                    <button className="btn btn-light" onClick={(e) => props.updatePost(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default AddPost;