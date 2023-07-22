const {fetchUsers, fetchUserData} = require('../model/usersModel')

exports.getUsers = (req, res, next) => {
    fetchUsers().then((users) => {
        res.status(200).send({
            users: users
        })
    }).catch((err) => {
        next(err)
    })
}



exports.getUser = (req, res, next) => {
    const username = req.params.username;
    fetchUserData(username).then((user) => {
        res.status(200).send({
            user: user
        })
    }).catch((err)=>{
        next(err);
    })
}
