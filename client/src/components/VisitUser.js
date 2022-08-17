import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Post from "./Post"

const VisitUser = ({ token, loadFeed, userId, postInfo, post, userData }) => {
    const location = useLocation()
    const { id } = location.state
    const [feed, setFeed] = useState(null)
    const getUserPage = async () => {
        const response = await fetch(`http://localhost:8080/userVisit/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        const data = await response.json()
        setFeed(data.postList)
    }

    useEffect(() => {
        getUserPage()
    }, [])

    const showComment = (postId) => {
        const replace = (commentArray) => {
            console.log(feed, 'feed')
            let updatedPost = feed.map(x => {
                if (x._id === postId) {
                    return { ...x, comment: commentArray.comment }
                }
                return x
            })
            setFeed(updatedPost)
        }
        const fetchThisComment = async () => {
            const response = await fetch(`http://localhost:8080/users/${userData._id}/posts/${postId}`, {
                headers: { Authorization: 'Bearer ' + token }
            })
            const postData = await response.json()
            console.log(postData, 'POSTDAATA')
            replace(postData)
        }
        fetchThisComment().catch(console.error)
    }

    return (
        <div>
            <div>
                {feed ? feed.map((postInfo) => {
                    return (
                        <Post loadFeed={loadFeed} token={token} userId={userId} postInfo={postInfo} key={postInfo._id} showComment={showComment} />
                    )
                }) : <h1>Loading</h1>}
            </div>
            <h1>In visit </h1>
        </div>
    )
}

export default VisitUser