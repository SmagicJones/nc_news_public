const express = require('express');
const router = express.Router();
const {
    getArticle,
    getArticles,
    getArticleComments,
    patchArticle,
    postArticle,
    deleteArticle
} = require('../controller/articlesController');

const {postComment} = require('../controller/commentsController')


router.route('/')
    .get(getArticles)
    .post(postArticle)    
router.route('/:article_id')
    .get(getArticle)
    .patch(patchArticle)
    .delete(deleteArticle)
router.route('/:article_id/comments')
    .get(getArticleComments)
    .post(postComment);



module.exports = router;