const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());

app.use(express.json())

const {
    getApi,
} = require('./controller/apiController')

const {
    getTopics,
} = require('./controller/topicController')

const {getUsers} = require('./controller/usersController')

const {postComment, deleteComment} = require('./controller/commentsController')

const {
    getArticle,
    getArticles,
    getArticleComments,
    patchArticle
} = require('./controller/articlesController')

app.get('/api', getApi)
app.get('/api/articles/:article_id', getArticle)
app.get('/api/topics', getTopics)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id/comments', getArticleComments)
app.get('/api/users', getUsers)



app.post('/api/articles/:article_id/comments', postComment)

app.patch('/api/articles/:article_id', patchArticle)

app.delete('/api/comments/:comment_id', deleteComment)



app.all('/*', (req, res, next) => {

    res.status(404).send({
        message: 'invalid endpoint'
    })

})

app.use((err, req, res, next) => {
    if (err.status && err.message) {
        res.status(err.status).send({
            message: err.message
        })
    } else next(err);
})

app.use((err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({
            message: 'Invalid input'
        })
    }
    if (err.code === '23503') {
        res.status(404).send({
            message: 'not found'
        })
    }
    if (err.code === '42703') {
        res.status(400).send({
            message: "invalid patch request"
        })
    } else next(err)
})

app.use((err, req, res, next) => {
    // console.log(err)
    res.status(500).send({
        message: 'Internal Server Error'
    })
})



module.exports = app;