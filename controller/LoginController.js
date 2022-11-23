/**
 * Controller for requests that are related to the admin login and registration.
 *
 * @author Darshan Ramjiyani
 *
 */

const { request, response } = require("express");

const loginView = (request, response) => {
  response.render("login", {});
};

const registerView = (request, response) => {
  response.render("register", {});
};

const loginInitiation = (request, response) => {
  console.log("Login Initiative");
  const admin = require("../models/adminModel");
  let row = admin.getAuthKey();
  if (row) console.log(row);
  response.render("login", {});
};

const registerInitiation = (request, response) => {
  console.log("Registration Initiative");
  const admin = require("../models/adminModel");

  const { username, password } = request.body;
  let row = admin.registerAdmin(
    request.param.fullName,
    request.param.username,
    request.param.password
  );
  if (row) console.log(row);
  response.render("register", {});
};

module.exports = {
  loginView,
  registerView,
  loginInitiation,
  registerInitiation,
};
