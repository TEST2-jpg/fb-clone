import { ReactComponent as Profile } from '../assets/profile.svg'
import { useEffect, useState } from 'react'

const EditPost = ({ token, userId, loadFeed, postInfo }) => {
    const [post, setPost] = useState('')
    const fetchOldPost = async () => {
        const response = await fetch(`http://localhost:8080/users/${userId}/posts/${postInfo._id}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        const result = await response.json()
        setPost(result)
    }

    const editPost = async () => {
        const jsonData = await fetch(`http://localhost:8080/users/${userId}/posts/${postInfo._id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                postBody: post.postMessage,
            })
        })
        await jsonData.json()
        loadFeed()
    }

    const loadingModal = () => {
        return (
            <div className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id={"post" + postInfo._id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit post</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Loading
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <button onClick={fetchOldPost} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#post" + postInfo._id}>
                Edit
            </button>
            {post ? <div className="modal fade" id={"post" + postInfo._id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit post</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <textarea class="form-control shadow-none" placeholder="What's on your mind?" value={post.postMessage} onChange={(e) => setPost(prev => ({...prev, postMessage: e.target.value }))}></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={editPost} className="btn btn-primary" data-bs-dismiss="modal">Save</button>
                        </div>
                    </div>
                </div>
            </div> : loadingModal()}
        </div>
    )
}

export default EditPost