var express = require('express');
var router = express.Router();
// const formidable = require('formidable');
const userHandler = require('../controller');

router.post('/api/registration', userHandler.saveNewUser);
router.post('/api/login', userHandler.login);
router.post('/api/refresh-token', userHandler.refreshToken)
router.get('/api/profile', userHandler.getProfile);
router.patch('/api/profile', userHandler.updateProfile); //not correct

router.delete('/api/users/:id', userHandler.deleteUser);
router.get('/api/users', userHandler.getUsers);
router.post('/api/news', userHandler.addArticle)
router.patch('/api/users/:id/permission',  userHandler.updatePermission)

router.delete('/api/news/:id', userHandler.deleteArticle)
router.get('/api/news', userHandler.getNews)
router.patch('/api/news/:id', userHandler.updateArticle)

module.exports = router;

