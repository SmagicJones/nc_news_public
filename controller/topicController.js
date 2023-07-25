const {fetchTopics, postTopicModel} = require('../model/topicModel')

exports.getTopics = (req, res, next) => {
    fetchTopics().then((result) => {
        res.status(200).send(result)
    }).catch((err) => {
        next(err)
    })
}

exports.postTopic = (req, res, next) => {
    const newTopic = req.body;
    postTopicModel(newTopic).then((result)=>{
        res.status(201).send({
            topic: result
        })
    }).catch((err) => {
        next(err)
    })
}

