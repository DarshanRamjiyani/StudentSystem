/**
 * Routes that are related to student are managed here.
 *
 * This file contains routes as follows:
 *      - GET           /
 *      - GET           /admin/login
 *      - GET           /admin/registration
 *      - POST          /admin/login/initiate
 *      - POST          /admin/registration/initiate
 *
 * @author Darshan Ramjiyani
 *
 */

const express = require("express");
const loginController = require("../controller/LoginController");
const studentController = require("../controller/StudentController");
const router = express.Router();

/* -- GET routes -- */

router.get("/admin/login", (request, response) => {
  loginController.loginView(request, response);
});

router.get("/admin/registration", (request, response) => {
  loginController.registerView(request, response);
});
router.get("/admin/logout", (request, response) => {
  loginController.logout(request, response);
});
router.get("/student", (req, res) => {
  studentController.listView(req, res);
});

router.get("/student/get", (req, res) => {studentController.listView(req, res);});
router.get("/student/register", (req, res) => {studentController.insertOneView(req, res)});
router.get("/student/update/:userId", (req, res) => {studentController.updateView(req, res)});
router.get("/student/remove/:userId", (req, res) => {studentController.removeView(req, res)});

/* -- POST routes -- */
router.post("/admin/login/initiate", (request, response) => {
  loginController.loginInitiation(request, response);
});

router.post("/admin/registration/initiate", (request, response) => {
  loginController.registerInitiation(request, response);
});

router.post("/student/register/initiate", (req, res) => {
  console.log(req.body);
  studentController.insertInitiative(req, res);
});
router.post("/student/update/:userId/initiate", (req, res) => {});
router.post("/student/remove/:userId/initiate", (req, res) => {});
module.exports = router;
