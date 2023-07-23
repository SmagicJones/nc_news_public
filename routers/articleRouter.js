const express = require('express');
const router = express.Router();
const {
    getArticle,
    getArticles,
    getArticleComments,
    patchArticle,
    postArticle
} = require('../controller/articlesController');

const {postComment} = require('../controller/commentsController')


router.route('/')
    .get(getArticles)
    .post(postArticle)
router.route('/:article_id')
    .get(getArticle)
    .patch(patchArticle);
router.route('/:article_id/comments')
    .get(getArticleComments)
    .post(postComment);



module.exports = router;