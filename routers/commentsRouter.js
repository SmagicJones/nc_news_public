const express = require('express');
const {deleteComment} = require('../controller/commentsController')

const router = express.Router();

router.route('/:comment_id').delete(deleteComment)

module.exports = router;