const {

    fetchTopics,
    fetchApi,
    fetchArticle
} = require('../model/news.model')

exports.getTopics = (req, res, next) => {
    fetchTopics().then((result) => {
        res.status(200).send(result)
    }).catch((err) => {
        next(err)
    })
}

exports.getApi = (req, res) => {
    fetchApi().then((result) => {
        const parsedResult = JSON.parse(result)
        res.status(200).send(parsedResult)
    })
}

exports.getArticle = (req, res) => {
    const article_id = req.params.article_id;
    fetchArticle(article_id).then((result) => {
        res.status(200).send(result)
    })

}