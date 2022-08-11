import { useState } from "react"

const Post = ({ postInfo, showComment }) => {
    const [btnState, setBtn] = useState(true)
    const preventFetch = () => {
        setBtn(false)
    }
    return (
        <div>
            <p>{postInfo.post}</p>
            {postInfo.comment.map((x,i) => <p key={i}>{x.comment}</p>)}
            <p>-----------------------------</p>
            <button onClick={() => {
                if (btnState) showComment(postInfo._id)
                preventFetch()
            }
            }>Comment</button>
        </div>
    )
}

export default Post