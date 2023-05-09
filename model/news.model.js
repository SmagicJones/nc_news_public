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