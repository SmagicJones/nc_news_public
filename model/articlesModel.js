const db = require('../db/connection')


exports.fetchArticle = (article_id) => {
    return db.query(`SELECT articles.*, COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments USING (article_id)
    WHERE article_id = $1
    GROUP BY articles.article_id;`, [article_id])
    .then((result) => {
        if(result.rows.length === 0){
            return Promise.reject({status: 404, message: 'No article by that ID'})
        }
        return result.rows
    })
}

exports.fetchArticles = (topic, order="desc", sort_by="created_at", limit=10, p=1) => {
    let queryStr = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, article_img_url, COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
    `;

    const queryValues = []
    let countQ = 'SELECT COUNT(*)::INT FROM articles'
    const validOrders = ["desc", "asc"];
    const validSortBy = ["created_at", "title", "topic", "author", "comment_count", "votes"];
    if(!validOrders.includes(order) || !validSortBy.includes(sort_by)){
        return Promise.reject({status: 400, message: "invalid order"})
    }
    if(topic){
        countQ += ` WHERE articles.topic = $1`;
        queryStr += ` WHERE topic = $1`;
        queryValues.push(topic)
    }

    queryStr += ` GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order}
    LIMIT ${limit} OFFSET ${(p-1) * limit}`
   
   

    return db.query(queryStr, queryValues)
    .then((result) => {
    
      if(result.rows.length === 0){
            return Promise.reject({
                status: 404,
                message: "not found"
            })  
        }   

     
        return Promise.all([result.rows, db.query(countQ, queryValues)])
    })
   .then(([articles, {rows}]) => {
    
        const total_count = rows;
        return {articles, total_count};
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

exports.postArticleModel = (articleObj) => {
    const {
        author,
        title,
        topic,
        body,
        article_img_url
    } = articleObj

    if (!articleObj.hasOwnProperty('author') && !articleObj.hasOwnProperty('title') && !articleObj.hasOwnProperty('body') && !articleObj.hasOwnProperty('topic') && !articleObj.hasOwnProperty('article_img_url')) {
        return Promise.reject({
            status: 400,
            message: 'invalid input'
        })
    }
   

    return db.query('INSERT INTO articles (author, title, topic, body, article_img_url) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [author, title, topic, body, article_img_url])
        .then((result) => {
           return result.rows[0]
    
        }).then((result)=>{
            return db.query(`
                SELECT articles.*, COUNT(comments.article_id)
                FROM articles
                LEFT JOIN comments USING (article_id)
                WHERE article_id in ($1)
                GROUP BY articles.article_id`, [result.article_id])
        })

        .then((result)=>{
            return result.rows[0]
        })

}