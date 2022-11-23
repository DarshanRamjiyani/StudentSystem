/**
 * Routes that are related to student are managed here.
 * 
 * This file contains routes as follows:
 *      - GET           /
 *      - GET           /admin/login                 
 *      - GET           /admin/registeration
 *      - POST          /admin/login/initiate
*       - POST          /admin/registeration/initiate
 * 
 * @author Darshan Ramjiyani
 * 
 */

const express = require('express');
const loginController = require('../controller/LoginController');
const router = express.Router();


/* -- GET routes -- */
router.get('/login', (request, response)=>{loginController.loginView});
router.get('/registeration',  (request, response)=>{loginController.registerView});

/* -- POST routes -- */
router.post('/login/initiate',  (request, response)=>{loginController.loginInitiation});
router.post('/registeration/initiate',  (rrequest, response)=>{loginController.registerInitiation});

module.exports = router;