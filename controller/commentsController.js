const {postCommentModel, deleteCommentModel, patchCommentModel} = require('../model/commentsModel');


exports.postComment = (req, res, next) => {
    const article_id = req.params.article_id
    const body = req.body
    postCommentModel(article_id, body).then((comment) => {
        res.status(201).send({
            comment: comment
        })

    }).catch((err) => {
        next(err)
    })

}



exports.deleteComment = (req, res, next) => {
    comment_id = req.params.comment_id
    deleteCommentModel(comment_id).then((deleted) => {
        res.status(204).send({
            deleted: deleted
        })
    }).catch((err) => {
        next(err)
    })
}

exports.patchComment = (req, res, next) => {
    comment_id = req.params.comment_id
    body = req.body
    patchCommentModel(comment_id, body).then((patch) => {
        res.status(200).send({
            patch: patch
        })
    }).catch((err) => {
        next(err)
    })
}