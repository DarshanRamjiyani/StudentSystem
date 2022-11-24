/**
 * Controller for requests that are related to the admin login and registration.
 *
 * @author Darshan Ramjiyani
 *
 */

const { request, response } = require("express");

const loginView = (request, response) => {
  response.render("../views/login.ejs", {isMessageToast: false});
};

const registerView = (request, response) => {
  response.render("../views/register.ejs", {isMessageToast: false});
};

const loginInitiation = (request, response) => {
  const admin = require("../models/adminModel");
  const {username, password} = request.body;
  const toast = { "message" : null}

  if(username && password )
  {
    admin.getAuthKey(username).then( (result) => {

      if (password === result)
      {
        response.redirect('/student/get');
      }else{
        toast.message = "Login credentials mismatched. Try again.";
        console.log(toast.message);
        response.render("../views/login.ejs", {isMessageToast: true, toast: toast});
      }
    }).catch(error => {
      console.log(error)
    });
  }
  else
  {
    toast.message = "Username and password is not valid.";
    console.log(toast.message);
    response.render("../views/login.ejs", {isMessageToast: true, toast: toast});
  }
};

const registerInitiation = (request, response) => {
  const admin = require("../models/adminModel");
  const { fullName,username, password } = request.body;
  
  const toast = { "message" : null}
  if(username && password && fullName){
    admin.registerAdmin(
      fullName,
      username,
      password
    ).then((row) => {
      toast.message = "Admin has been registered successfully. Please go to login page.";
      response.render("../views/register.ejs", {'toast': toast, 'isMessageToast': true});
  });
}}

const logout = (request, response) => {
  response.redirect('/admin/login');
}

module.exports = {
  loginView,
  registerView,
  loginInitiation,
  registerInitiation,
  logout
};
