const {
    fetchTopics
} = require('../model/news.model')

exports.getTopics = (req, res) => {
    fetchTopics().then((result) => {
        res.status(200).send(result)
    })
}