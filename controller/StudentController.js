/**
 * Controller for requests that are related to the student.
 * 
 * @author Darshan Ramjiyani
 * 
 */

const { request, response } = require('express');
const studentModel = require('../models/studentModel');


const insertOneView = (request, response) => {
        response.render('insert');
}
const insertManyView = (request, response) => {
        
        response.render('insertMany');
}
const updateView = (request, response) => {
        response.render('update');
}
const removeView = (request, response) => {
        response.render('remove');
}
const listView = (request, response) => {
        response.render('dashboard');
}

const insertInitiative = (request, response) => {
        
        const {usersData} = request.body;
        let row = studentModel.insertRecords(usersData);
        if(row)
                console.log(row);
        
        response.redirect('/student');
} 
const updateInitiative = (request, response) => {} 
const removeInitiative = (request, response) => {}

module.exports = { insertOneView, insertManyView, updateView, removeView, listView, insertInitiative, updateInitiative, removeInitiative };