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

exports.patchCommentModel = (comment_id, patchObj) => {
    return db.query('SELECT * FROM comments WHERE comment_id = $1', [comment_id]).then((result) => {
        if (result.rows.length === 0) {
            return Promise.reject({
                status: 404,
                message: 'not found'
            })
        }
    }).then(() => {
        if (!patchObj.hasOwnProperty('inc_votes')) {
            return Promise.reject({
                status: 400,
                message: 'invalid input'
            })
        }
        return db.query(`UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *;`, [patchObj.inc_votes, comment_id]).then((result) => {
            return result.rows[0];
        })

    })

}