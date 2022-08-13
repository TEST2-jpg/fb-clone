import { useEffect, useState } from 'react'
import Post from './Post'
import CreatePost from './CreatePost'
import Sidebar from './Sidebar'
const Home = () => {
    const [feed, setFeed] = useState('')
    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch('http://localhost:8080')
            const postData = await response.json()
            setFeed(postData.postList)
            console.log(postData)
        }
        fetchPost().catch(console.error)
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
            const response = await fetch('http://localhost:8080/users/' + postId)
            const postData = await response.json()
            console.log(postData, 'POSTDAATA')
            replace(postData)
        }
        fetchThisComment().catch(console.error)
    }

    return (
        <div>
            <button onClick={() => {
                console.log(feed)
            }}>CONSOLE LOGS</button>
            <div className='flex-container'>
                <Sidebar />
                <div>
                    <CreatePost />
                    {feed ? feed.map((postInfo) => {
                        return (
                            <Post postInfo={postInfo} key={postInfo._id} showComment={showComment} />
                        )
                    }) : <h1>Loading</h1>}
                </div>
            </div>

        </div>
    )
}

export default Home