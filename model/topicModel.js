const db = require('../db/connection')

exports.fetchTopics = () => {
    return db.query('SELECT * FROM topics;').then((result) => {
        return result.rows
    })
}

exports.postTopicModel = (topicObj) =>{
    const {
        slug,
        description
    } = topicObj

    if (!topicObj.hasOwnProperty('slug') && !commentObj.hasOwnProperty('description')) {
        return Promise.reject({
            status: 400,
            message: 'invalid input'
        })
    }
    return db.query('INSERT INTO topics VALUES ($1, $2) RETURNING *;', [slug, description])
        .then((result) => {
            return result.rows[0];
        })
}