const {
    fetchTopics,
    fetchApi
} = require('../model/news.model')

exports.getTopics = (req, res) => {
    fetchTopics().then((result) => {
        res.status(200).send(result)
    })
}

exports.getApi = (req, res) => {
    fetchApi().then((result) => {
        const parsedResult = JSON.parse(result)
        res.status(200).send(parsedResult)
    })
}