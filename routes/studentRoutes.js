/**
 * Routes that are related to student are managed here.
 * 
 * This file contains routes as follows:
 *      - GET       /student                  
 *      - GET       /student/get
 *      - GET       /student/get/all
 *      - GET       /student/register
 *      - GET       /student/register/many
 *      - POST      /student/register/initiate
 *      - GET       /student/update
 *      - POST      /student/update/initiate
 *      - GET       /student/remove
 *      - POST      /student/remove/initiate
 * 
 * @author Darshan Ramjiyani
 * 
 */

const express = require('express');
const StudentController = require('../controller/StudentController');
const router = express.Router();

/* -- GET routes -- */

router.get("/student", (req, res)=>{});
router.get("/student/get", (req, res)=>{});
router.get("/student/get/all", (req, res)=>{});
router.get("/student/register", (req, res)=>{});
router.get("/student/register/many", (req, res)=>{});
router.get("/student/update", (req, res)=>{});
router.get("/student/remove", (req, res)=>{});


/* -- POST routes -- */

router.post("/student/register/initiate", (req, res)=>{});
router.post("/student/update/initiate", (req, res)=>{});
router.post("/student/remove/initiate", (req, res)=>{});


module.exports = router;