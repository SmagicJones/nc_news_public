const {

    fetchTopics,
    fetchApi,
    fetchArticle,
    fetchArticles,
    fetArticleComments,
    fetchArticleComments
} = require('../model/news.model')

exports.getTopics = (req, res, next) => {
    fetchTopics().then((result) => {
        res.status(200).send(result)
    }).catch((err) => {
        next(err)
    })
}

exports.getApi = (req, res, next) => {
    fetchApi().then((result) => {
        const parsedResult = JSON.parse(result)
        res.status(200).send(parsedResult)
    }).catch((err) => {
        next(err)
    })
}

exports.getArticle = (req, res, next) => {
    const article_id = req.params.article_id;
    fetchArticle(article_id).then((article) => {
        res.status(200).send({
            article: article
        })
    }).catch((err) => {
        next(err)
    })

}

exports.getArticles = (req, res, next) => {
    fetchArticles().then((articles) => {
        res.status(200).send({
            articles: articles
        })
    }).catch((err) => {
        next(err)
    })
}

exports.getArticleComments = (req, res, next) => {
    article_id = req.params.article_id
    fetchArticleComments(article_id).then((comments) => {
        res.status(200).send({
            comments: comments
        })
    }).catch((err) => {
        next(err)
    })

}