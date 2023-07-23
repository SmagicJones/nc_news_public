const express = require('express');
const cors = require('cors')
const app = express();
const topicRouter = require('./routers/topicRouter');
const articleRouter = require('./routers/articleRouter');
const usersRouter = require('./routers/usersRouter');
const commentsRouter = require('./routers/commentsRouter');

app.use(cors());

app.use(express.json())

const {
    getApi,
} = require('./controller/apiController')


app.get('/api', getApi)

app.use('/api/topics', topicRouter)

app.use('/api/articles', articleRouter);

app.use('/api/users', usersRouter)

app.use('/api/comments', commentsRouter)



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