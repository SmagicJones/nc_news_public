const express = require('express');
const {getTopics, postTopic} = require('../controller/topicController');

const router = express.Router();

router.route('/')
    .get(getTopics)
    .post(postTopic)

module.exports = router;

