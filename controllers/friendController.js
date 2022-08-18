const User = require('../models/user')
const Friend = require('../models/friend')

exports.addFriend = async (req, res, next) => {
    console.log(req.body)
    const {requesterId, recipientId} = req.body
    const requesterStatus = new Friend({
        requester : requesterId,
        recipient : recipientId,
        status: 1,
    })
    const recipientStatus = new Friend({
        recipient : requesterId,
        requester : recipientId,
        status: 2
    })
    await requesterStatus.save()
    await recipientStatus.save()

    const requester = await User.findById(requesterId)
    requester.friends.push(requesterStatus)
    await requester.save()

    const recipient = await User.findById(recipientId)
    recipient.friends.push(recipientStatus)
    await recipient.save()

    res.status(200).json({message: 'request sent', requester})
}

exports.getAddFriendStatus = async(req, res, next) => {
    const {uId, friendId} = req.params
    const user = await User.findById(uId).populate({path: 'friends', match: {recipient: friendId} })
    if(user.friends.length === 0) return res.status(200).json({message: 'Add friend', friendStatus:[{status: 0}]})
    console.log(user.friends, 'oooooooo')
    res.status(200).json({message: 'fetched', friendStatus: user.friends})
}

exports.undoRequest = async(req, res, next) => {
    const {requesterId, recipientId} = req.body
    
    const requesterStatus = await Friend.deleteMany({
        requester: requesterId,
        recipient: recipientId
    })

    const recipientStatus = await Friend.deleteMany({
        recipient: requesterId,
        requester: recipientId
    })

    console.log(requesterStatus ,'11111111111111111111111111', recipientStatus)

    res.status(200).json({message: 'Done'})
}
