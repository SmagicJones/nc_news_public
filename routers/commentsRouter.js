const express = require('express');
const {deleteComment, patchComment} = require('../controller/commentsController')

const router = express.Router();

router.route('/:comment_id')
    .delete(deleteComment)
    .patch(patchComment);

module.exports = router;