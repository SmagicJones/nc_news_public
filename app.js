const express = require('express');

const app = express();

app.use(express.json())

const {

    getTopics,
    getApi,
    getArticle,
    getArticles
} = require('./controller/news.controller')

app.get('/api', getApi)
app.get('/api/articles/:article_id', getArticle)
app.get('/api/topics', getTopics)
app.get('/api/articles', getArticles)
// app.use((err, req, res, next)=>{
//     if(err.status &&)
// })


app.all('*', (req, res) => {
    res.status(404).send({
        message: 'invalid endpoint'
    })

})



module.exports = app;