const express = require('express');
const {getUsers, getUser} = require('../controller/usersController');

const router = express.Router();

router.route('/')
    .get(getUsers)
router.route('/:username')
    .get(getUser)


module.exports = router;
