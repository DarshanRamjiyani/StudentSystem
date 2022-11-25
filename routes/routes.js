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

router.get("/student/get", (req, res) => {
  studentController.listView(req, res);
});
router.get("/student/register", (req, res) => {
  studentController.insertView(req, res)
});
router.get("/student/update/:userId", (req, res) => {
  studentController.updateView(req, res)
});

/* -- POST routes -- */

router.post("/admin/login/initiate", (request, response) => {
  loginController.loginInitiation(request, response);
});

router.post("/admin/registration/initiate", (request, response) => {
  loginController.registerInitiation(request, response);
});

router.get("/student/register/initiate", (request, response) => {
  studentController.insertInitiative(request, response);
});

router.get("/student/update/:userId/initiate", (request, response) => {
  console.log("update call");
  studentController.updateInitiative(request, response);
});

router.get("/student/remove/:userId", (request, response) => {
  studentController.removeInitiative(request, response);
});

router.get("/dataFromCSV",  (request, response) => {
  studentController.upload_csv().then((result)=>{console.log('done writing from csv to db.')});
});
module.exports = router;
