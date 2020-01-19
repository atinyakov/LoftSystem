var express = require('express');
var router = express.Router();
const formidable = require('formidable');
const userHandler = require('../controller');
// {
//     firstName: String,
//     id: Primary key,
//     image: String,
//     middleName: String,
//     permission: {
//         chat: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
//         news: { C: Boolean, R: Boolean, U: Boolean, D: Boolean },
//         settings: { C: Boolean, R: Boolean, U: Boolean, D: Boolean }
//     }
//     surName: String,
//     username: String,

//     accessToken: String,
//         refreshToken: String,
//         accessTokenExpiredAt: Date (ms),
//         refreshTokenExpiredAt: Date (ms)
// }

router.post('/api/registration', userHandler.saveNewUser);
router.post('/api/login', userHandler.login);
// router.patch('/api/profile', uerHandler)


module.exports = router;

