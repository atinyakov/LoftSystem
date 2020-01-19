var express = require('express');
var router = express.Router();
// const formidable = require('formidable');
const userHandler = require('../controller');

router.post('/api/registration', userHandler.saveNewUser);
router.post('/api/login', userHandler.login);
router.get('/api/profile', userHandler.getProfile);
router.patch('/api/profile', userHandler.updateProfile);
router.get('/api/users', userHandler.getUsers);
router.patch('/api/users/:id/permission',  userHandler.updatePermission)

router.post('/api/news', userHandler.addArticle)

module.exports = router;

