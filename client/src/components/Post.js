const Post = ({ postInfo, showComment }) => {
    return (
        <div key={postInfo._id}>
            <p>{postInfo.post}</p>
            {postInfo.comment.map((x,i) => <p key={i}>{x.comment}</p>)}
            <p>-----------------------------</p>
            <button onClick={() => showComment(postInfo._id)}>Comment</button>
        </div>
    )
}

export default Post