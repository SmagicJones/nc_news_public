const express = require('express');

const app = express();

app.use(express.json())

const {
    getTopics
} = require('./controller/news.controller')

app.get('/api/topics', getTopics)

// app.use((err, req, res, next)=>{
//     if(err.status &&)
// })

app.all('*', (req, res) => {
    res.status(404).send({
        message: 'invalid endpoint'
    })

})



module.exports = app;