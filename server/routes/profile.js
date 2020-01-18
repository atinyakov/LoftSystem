var express = require('express');
var router = express.Router();
const formidable = require('formidable');
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

router.post('/api/registration', (req, res) => {
    console.log(req.body)
})

module.exports = router;

