const {postCommentModel, deleteCommentModel} = require('../model/commentsModel');


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



exports.deleteComment = (req, res, next) => {
    comment_id = req.params.comment_id
    console.log(comment_id)
    deleteCommentModel(comment_id).then((deleted) => {
        res.status(204).send({
            deleted: deleted
        })
    }).catch(err => {
        next(err)
    })
}