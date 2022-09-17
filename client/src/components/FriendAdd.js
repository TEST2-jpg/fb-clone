import { useEffect, useState } from "react"

const FriendAdd = ({token, userId, id, load}) => {
    const [statusInfo, setStatusInfo] = useState(null)
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

    const addFriend = async () => {
        const response = await fetch(`http://localhost:8080/friend/addFriend`, {
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
        load()
    }

    const undoRequest = async() => {
        const response = await fetch(`http://localhost:8080/friend/undoRequest`, {
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
        load()
    }
    
    const acceptRequest = async() => {
        const response = await fetch(`http://localhost:8080/friend/acceptRequest`, {
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
        friendStatus()
        load()
    }

    const determineButton = () => {
        if (statusInfo.status === 0) return <button className="btn btn-primary fw-semibold shadow-none w-100" onClick={addFriend}>Add Friend</button>
        else if (statusInfo.status === 1) return <button className="btn btn-primary fw-semibold shadow-none w-100" onClick={undoRequest}>Pending...</button>
        else if (statusInfo.status === 2) return <button className="btn btn-primary fw-semibold shadow-none w-100" onClick={acceptRequest}>Accept request</button>
        else if (statusInfo.status === 3) return <div><button className="btn btn-primary fw-semibold shadow-none w-100" onClick={undoRequest}>Remove friend</button></div>
        return <div>Not loaded</div>
    }
    
    return (
        <div className="align-self-end w-100">
            {statusInfo && determineButton()}
        </div>
    )
}

export default FriendAdd