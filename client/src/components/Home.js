import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Post from './Post'
import CreatePost from './CreatePost'
import Sidebar from './Sidebar'
import Login from './Login'
import Contacts from './Contacts'
import Nav from './Nav'
const Home = ({ token, ps, userData, userId }) => {
    const [feed, setFeed] = useState('')
    const navigate = useNavigate()
    const loadFeed = () => {
        const fetchPost = async () => {
            const response = await fetch('http://localhost:8080', {
                headers: { Authorization: 'Bearer ' + token }
            })
            const postData = await response.json()
            setFeed(postData.postList)
            console.log(postData)
        }
        fetchPost().catch(console.error)
    }

    useEffect(() => {
        if (!token) {
            return navigate('/login')
        }
    }, [token])

    useEffect(() => {
        loadFeed()
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
            const response = await fetch(`http://localhost:8080/users/${userData._id}/posts/${postId}/comments`, {
                headers: { Authorization: 'Bearer ' + token }
            })
            const postData = await response.json()
            console.log(postData, 'POSTDAATA')
            replace(postData)
        }
        fetchThisComment().catch(console.error)
    }
    return (
        <>
            {token ? <div>
                <Nav/>
                <button onClick={() => {
                    console.log(feed)
                    console.log(userId)
                    console.log(token)
                    console.log(userData)

                }}>CONSOLE LOGS</button>
                <div className='flex-container'>
                    <Sidebar fullName={userData.first_name + ' ' + userData.last_name} />
                    <div className='d-flex px-4'>
                        <div className='d-flex flex-column'>
                            <CreatePost loadFeed={loadFeed} token={token} userId={userId} />
                                <div>
                                    {feed ? feed.map((postInfo) => {
                                        return (
                                            <Post loadFeed={loadFeed} token={token} userId={userId} postInfo={postInfo} key={postInfo._id} showComment={showComment} />
                                        )
                                    }) : <h1>Loading</h1>}
                                </div>
                        </div>
                    </div>
                    <Contacts />
                </div>
            </div> : <Login />}
        </>
    )
}

export default Home