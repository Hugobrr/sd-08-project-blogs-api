const routes = require('express').Router();
const users = require('./users');
const login = require('./login');
const categories = require('./categories');
const posts = require('./posts');

routes.get('/user', users);
routes.get('/user/:id', users);
routes.post('/user', users);
routes.post('/login', login);
routes.get('/categories', categories);
routes.post('/categories', categories);
routes.post('/post', posts);

module.exports = routes;