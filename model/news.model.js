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

exports.fetchArticles = () => {
    return db.query(`SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, article_img_url, COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id;`).then((result) => {
        return result.rows
    })
}

exports.fetchArticleComments = (article_id) => {
    return db.query(`SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.article_id FROM comments
    WHERE comments.article_id = $1
    ORDER BY created_at DESC`, [article_id]).then((result) => {
        return result.rows
    })

}