import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Post from './Post'
import CreatePost from './CreatePost'
import Sidebar from './Sidebar'
import Login from './Login'
const Home = ({ token, ps }) => {
    const [feed, setFeed] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if(!token) {
            return navigate('/login')
        }
    }, [token])
    
    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch('http://localhost:8080', {
                headers: { Authorization: 'Bearer ' + token }
            })
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
            const response = await fetch('http://localhost:8080/users/' + postId , {
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
            {token ? <div>
                <button onClick={() => {
                    console.log(feed)
                    console.log(ps)
                    console.log(token)
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
            </div> : <Login/>}
        </div>
    )
}

export default Home