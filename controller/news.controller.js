const {

    fetchTopics,
    fetchApi,
    fetchArticle,
    fetchArticles,
    fetchArticleComments,
    postCommentModel,
    patchArticleModel
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

exports.postComment = (req, res, next) => {
    article_id = req.params.article_id
    body = req.body
    postCommentModel(article_id, body).then((comment) => {
        res.status(201).send({
            comment: comment
        })

    }).catch((err) => {
        // console.log(err)
        next(err)
    })

}

exports.patchArticle = (req, res, next) => {
    article_id = req.params.article_id
    body = req.body
    patchArticleModel(article_id, body).then((patch) => {
        res.status(200).send({
            patch: patch
        })
    }).catch((err) => {
        // console.log(err)
        next(err)
    })
}