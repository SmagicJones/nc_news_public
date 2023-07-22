const express = require('express');
const {
    getArticle,
    getArticles,
    getArticleComments,
    patchArticle
} = require('../controller/articlesController');

const {postComment} = require('../controller/commentsController')

const router = express.Router();

router.route('/')
    .get(getArticles);
router.route('/:article_id')
    .get(getArticle)
    .patch(patchArticle);
router.route('/:article_id/comments')
    .get(getArticleComments)
    .post(postComment);


module.exports = router;