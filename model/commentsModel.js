const db = require('../db/connection')


exports.postCommentModel = (article_id, commentObj) => {
    const {
        username,
        body
    } = commentObj

    if (!commentObj.hasOwnProperty('username') && !commentObj.hasOwnProperty('body')) {
        return Promise.reject({
            status: 400,
            message: 'invalid input'
        })
    }

    return db.query('INSERT INTO comments (author, article_id, body) VALUES ($1, $2, $3) RETURNING *;', [username, article_id, body])
        .then((result) => {
            return result.rows[0];
        })

}



exports.deleteCommentModel = (comment_id) => {
    return db.query('SELECT * FROM comments WHERE comment_id = $1', [comment_id]).then((result) => {
        if (result.rows.length === 0) {
            return Promise.reject({
                status: 400,
                message: "not found"
            })
        }
    }).then(() => {
        return db.query('DELETE FROM comments WHERE comment_id = $1 RETURNING *;', [comment_id]).then((result) => {
            return result.rows[0]
        })
    })

}