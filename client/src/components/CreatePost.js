import {useState} from 'react'

const CreatePost = ({token, userId, loadFeed}) => {
    const [post, setPost] = useState('')
    const addPost = async () => {
        const jsonData = await fetch('http://localhost:8080/users/posts', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                postBody: post,
                userId
            })
        })
        await jsonData.json()
        setPost('')
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        await addPost();
        loadFeed()
     };    
    return (
        <>
            <form onSubmit={handleSubmit} >
                <input name="post" placeholder="What's on your mind?" value={post} onChange={(e) => setPost(e.target.value)}></input>
                <button>SUBMIT</button>
            </form>
        </>
    )
}

export default CreatePost