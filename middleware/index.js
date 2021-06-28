const { checkName } = require('./checkDisplayName');
const { checkEmail } = require('./checkEmail');
const { checkPassword } = require('./checkPassword');
const { getToken, decodeToken } = require('./jwtValidation');
const { checkToken } = require('./checkToken');
const { checkNameExist } = require('./checkName');
const { checkPost } = require('./checkPost');

module.exports = { 
checkName,
checkEmail,
checkPassword,
getToken,
checkToken,
checkNameExist,
checkPost,
decodeToken,
};