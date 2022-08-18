import { useEffect, useState } from "react"

const FriendAdd = ({token, userId, id}) => {
    const [statusInfo, setStatusInfo] = useState(null)
    const addFriend = async () => {
        const response = await fetch(`http://localhost:8080/friend`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                requesterId: userId,
                recipientId: id,
            })
        })
        const postData = await response.json()
        friendStatus()
    }
    const friendStatus = async () => {
        const response = await fetch(`http://localhost:8080/friend/${userId}/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        const data = await response.json()
        setStatusInfo(data.friendStatus[0])
    }

    useEffect(() => {
        friendStatus()
    }, [])

    const determineButton = () => {
        if (statusInfo.status === 0) return <button onClick={addFriend}>Add me</button>
        else if (statusInfo.status === 1) return <button>Pending...</button>
        else if (statusInfo.status === 2) return <button>Accept request</button>
        else if (statusInfo.status === 3) return <div><h1>Friends</h1></div>
        return <div>Not loaded</div>
    }

    return (
        <div>
            {console.log(statusInfo)}
            {statusInfo && determineButton()}
            <button onClick={addFriend}>Add me</button>
        </div>
    )
}

export default FriendAdd