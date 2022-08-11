import { useEffect, useState } from 'react'

const Home = () => {
    const [feed, setFeed] = useState('')
    useEffect(() => {
        const fetchPost = async() => {
            const response = await fetch('http://localhost:8080')
            const postData = await response.json()
            setFeed(postData)
            console.log(postData)
        }
        fetchPost().catch(console.error)
    }, [])
    return (
        <div>
           {feed.postList ? feed.postList.map((postInfo) => {
                return(
                    <div key={postInfo._id}>
                        <p key={postInfo._id}>{postInfo.post}</p>
                        <p>{postInfo.comment.map(x => <p key={x}>{x}</p>)}</p>
                        <p>-----------------------------</p>
                    </div>
                )
           }): <h1>Loading</h1>}
        </div>
    )
}

export default Home