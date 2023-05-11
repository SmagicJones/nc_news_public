const express = require('express');

const app = express();

app.use(express.json())

const {

    getTopics,
    getApi,
    getArticle,
    getArticles,
    getArticleComments
} = require('./controller/news.controller')

app.get('/api', getApi)
app.get('/api/articles/:article_id', getArticle)
app.get('/api/topics', getTopics)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id/comments', getArticleComments)



app.all('*', (req, res) => {
    res.status(404).send({
        message: 'invalid endpoint'
    })

})

app.use((err, req, res, next) => {
    if (err.status && err.message) {
        res.status(err.status).send({
            message: err.message
        })
    } else {
        res.status(500).send({
            message: 'Interal server error'
        })
    }
})



module.exports = app;