const express = require('express');

const ongController = require('./controllers/ongController');
const incidentsController = require('./controllers/incidentsController');
const profileController = require('./controllers/profileController');
const authController = require('./controllers/authController');

const routes = express.Router();


routes.get('/ongs', ongController.index); 
routes.post('/ongs', ongController.create);

routes.get('/profile', profileController.index); 

routes.post('/login', authController.login); 

routes.get('/incidents', incidentsController.index); 
routes.post('/incidents', incidentsController.create);
routes.delete('/incidents/:id', incidentsController.delete);

module.exports = routes;