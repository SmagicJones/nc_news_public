const {

    fetchArticle,
    fetchArticles,
    fetchArticleComments,
    patchArticleModel,
    postArticleModel,

} = require('../model/articlesModel')


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
    const topic = req.query.topic
    const order = req.query.order
    const sort_by = req.query.sort_by

    fetchArticles(topic, order, sort_by).then((articles) => {
        res.status(200).send({
            articles: articles
        })
    }).catch((err) => {
        next(err)
    })
}

exports.getArticleComments = (req, res, next) => {
    const article_id = req.params.article_id
    fetchArticleComments(article_id).then((comments) => {
        res.status(200).send({
            comments: comments
        })
    }).catch((err) => {
        next(err)
    })

}

exports.patchArticle = (req, res, next) => {
   const  article_id = req.params.article_id
    const body = req.body
    patchArticleModel(article_id, body).then((patch) => {
        res.status(200).send({
            patch: patch
        })
    }).catch((err) => {
        // console.log(err)
        next(err)
    })
}

exports.postArticle = (req, res, next) => {
    const newArticle = req.body
    postArticleModel(newArticle).then((article) => {
        res.status(201).send({
            article: article
        })
    }).catch((err) => {
        next(err)
    })

}