const express = require('express');
const {getTopics} = require('../controller/topicController');

const router = express.Router();

router.route('/').get(getTopics)

module.exports = router;

