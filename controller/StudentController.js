/**
 * Controller for requests that are related to the student.
 *
 * @author Darshan Ramjiyani
 *
 */

const e = require("express");
const { request, response } = require("express");
const studentModel = require("../models/studentModel");

const insertOneView = (request, response) => {
        response.render("../views/insert");
};
const insertManyView = (request, response) => {
        response.render("../views/insertMany");
};
const updateView = (request, response) => {
        response.render("../views/update");
};
const removeView = (request, response) => {
        response.render("../views/remove");
};
const listView = (request, response) => {
        studentModel.getRecord("*", null, null).then(
                (rows) => {
                        const dataForView = { userData: null, numRows: null, isError: true}; 
                        if (rows.length > 0) {
                                dataForView.isError = false;
                                dataForView.userData = rows;
                                dataForView.numRows = rows.length;
                        } else {
                                dataForView.userData = null;
                                dataForView.numRows = 0;
                                console.log('0 entry in database.');
                        }

                        response.render('../views/dashboard', {data: dataForView});
                },
                (error) => {
                        console.log(error);
                }
        );
};

const insertInitiative = (request, response) => {
        const { action } = request.body;
        let fileMetaData = getFileFromRequestBody(request, request.files.studentDataFile);

        if (!fileMetaData.isError) {
                if (action === "Submit Data") {
                        let data = [{
                                firstName: request.body.fullName,
                                lastName: request.body.lastName,
                                age: request.body.age,
                                grade: request.body.grade,
                                subjects: request.body.subjects,
                                avgScore: request.body.avgScore,
                                image: fileMetaData.uploadLocation
                        }];
                        console.log(data);
                        studentModel.insertRecord(data);
                }
                else if (action === "Submit File") {
                        const fs = require("fs");
                        const { parse } = require("csv-parse");
                        fs.createReadStream(fileMetaData.uploadLocation)
                                .pipe(parse({ delimiter: ",", from_line: 2 }))
                                .on("data", function (row) {
                                        let data = [{
                                                firstName: row[1],
                                                lastName: row[2],
                                                age: row[3],
                                                subjects: row[4],
                                                grade: row[5],
                                                avgScore: row[6],
                                                image: row[7]
                                        }];
                                        console.log(data);
                                        studentModel.insertRecord(data);
                                });
                }
        }
        else {
                console.log("File cannot be read due to error in upload operation.");
        }
        response.redirect("/student");
};
const updateInitiative = (request, response) => { };
const removeInitiative = (request, response) => { };


function getFileFromRequestBody(req, fileInputField) {
        let dataToReturn = { message: null, isError: null };

        if (!req.files || Object.keys(req.files).length === 0) {

                dataToReturn.message = 'No files were uploaded.';
                dataToReturn.isError = true;
                console.log(dataToReturn.message, error);
                return dataToReturn;
        }

        uploadLocation = '/assets/' + fileInputField.name;

        sampleFile.mv(uploadLocation, (error) => {
                if (error) {
                        dataToReturn.message = "Error while uploading file.";
                        dataToReturn.isError = true;
                        console.log(dataToReturn.message, error);
                } else {

                        dataToReturn.message = "";
                        dataToReturn.isError = false;
                        dataToReturn.fileName = fileInputField.name;
                        dataToReturn.fileUploadPath = uploadLocation;
                }
        });
        return dataToReturn;
}
module.exports = {
        insertOneView,
        insertManyView,
        updateView,
        removeView,
        listView,
        insertInitiative,
        updateInitiative,
        removeInitiative,
};
