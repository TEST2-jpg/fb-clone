import { useState } from "react"

const Post = ({ postInfo, showComment, userId, token, loadFeed }) => {
    const [btnState, setBtn] = useState(true)
    const preventFetch = () => {
        setBtn(false)
    }
    const deletePost = async(postId) => {
        await fetch(`http://localhost:8080/users/${userId}/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: 'Bearer ' + token
            }
        })
        console.log('run')
    }

    return (
        <div>
            <p><b>{`${postInfo.author.first_name} ${postInfo.author.last_name}`}</b></p>
            <p>{postInfo.post}</p>
            {postInfo.comment.map((x,i) => <p key={i}>{x.comment}</p>)}
            <p>-----------------------------</p>
            <button onClick={() => {
                if (btnState) showComment(postInfo._id)
                preventFetch()
            }
            }>Comment</button>
            {postInfo.author._id === userId ? <button onClick={ async ()=>{
                await deletePost(postInfo._id)
                loadFeed()
            }}>Delete</button>: null}
        </div>
    )
}

export default Post