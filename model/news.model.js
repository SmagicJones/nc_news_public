const db = require('../db/connection')
const fs = require('fs/promises')




exports.fetchTopics = () => {
    return db.query('SELECT * FROM topics;').then((result) => {
        return result.rows
    })

}

exports.fetchApi = () => {
    return fs.readFile(`${__dirname}/../endpoints.json`, 'utf-8').then((result) => {
        return result
    })

}

exports.fetchArticle = (article_id) => {
    return db.query('SELECT * FROM articles WHERE article_id = $1;', [article_id]).then((result) => {
        return result.rows
    })
}

exports.fetchArticles = (topic) => {
    const queryStr1 = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, article_img_url, COUNT(comments.article_id) AS comment_count
    FROM articles`
    const queryStr2 = ` 
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id;`
    const insertTopicQuery = ` \n    WHERE topic = '${topic}'`
    console.log(queryStr1 + insertTopicQuery + queryStr2, "query string")
    return db.query(queryStr1 + insertTopicQuery + queryStr2).then((result) => {
        console.log(result.rows)
        return result.rows
    })
}



exports.fetchArticleComments = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id]).then((result) => {
        if (result.rows.length === 0) {
            return Promise.reject({
                status: 404,
                message: "not found"
            })
        }
    }).then(() => {
        return db.query(`SELECT * FROM comments
    WHERE comments.article_id = $1
    ORDER BY created_at DESC`, [article_id]).then((result) => {
            return result.rows
        })

    })
}

exports.fetchUsers = () => {
    return db.query('SELECT * FROM users').then((result) => {
        return result.rows
    })
}

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

exports.patchArticleModel = (article_id, patchObj) => {
    return db.query('SELECT * FROM articles WHERE article_id = $1', [article_id]).then((result) => {
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
        return db.query(`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`, [patchObj.inc_votes, article_id]).then((result) => {
            return result.rows[0];
        })

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