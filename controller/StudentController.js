const studentModel = require("../models/studentModel");

function listView(request, response) {
        studentModel.getRecord("*", null, null).then(
                (rows) => {
                        const dataForView = { userData: null, numRows: null, isError: true };
                        if (rows.length > 0) {
                                dataForView.isError = false;
                                dataForView.userData = rows;
                                dataForView.numRows = rows.length;
                        } else {
                                dataForView.userData = null;
                                dataForView.numRows = 0;
                                console.log('0 entry in database.');
                        }
                        console.log(dataForView);
                        response.render('../views/dashboard', { data: dataForView });
                },
                (error) => {
                        console.log(error);
                }
        );
};
function insertView(request, response) {
        response.render('../views/insert');
}
function updateView(request, response) {
        studentModel.getRecord("*", "`id` = "+request.params.userId, 1).then(
                (rows) => {
                        const dataForView = { userData: null, numRows: null, isError: true };
                        if (rows.length > 0) {
                                dataForView.isError = false;
                                dataForView.userData = rows;
                                dataForView.numRows = rows.length;
                                
                                console.log("DATA : ", dataForView);
                                response.render('../views/update', { data: dataForView });

                        } else {
                                dataForView.userData = null;
                                dataForView.numRows = 0;
                                console.log('0 entry in database.');
                                response.redirect("/student/get");
                        }
                },
                (error) => {
                        console.log("Database error.");
                }
        );
}
function insertInitiative(req, res) {
        console.log(req);
        let data = [{
                firstName: req.query.firstName,
                lastName: req.query.lastName,
                age: req.query.age,
                grade: req.query.grade,
                subjects: req.query.subjects,
                avgScore: req.query.avgScore,
        }];
        console.log(data);
        studentModel.insertRecord(data);
        res.redirect('/student/register');
};

function updateInitiative(request, response) {
        if (request.params.userId === "" || request.params.userId === 'undefined') {
                response.status(400).send('Please provide user id to perform task.');
                return;
        }
        
        let data = [{
                first_name: request.query.firstName,
                last_name: request.query.lastName,
                age: request.query.age,
                grade: request.query.grade,
                subjects: request.query.subjects,
                avg_score: request.query.avgScore,
        }];

        studentModel.updateRecord(request.params.userId, data);
        response.redirect("/student/get");
};

function removeInitiative(request, response) {

        if (request.params.userId === "" || request.params.userId === 'undefined') {
                response.status(400).send('Please provide user id to perform task.');
                return;
        }

        studentModel.removeRecord(request.params.userId);
        response.redirect("/student/get");
};


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
async function upload_csv()
{
        const fs = require("fs");
        const { parse } = require("csv-parse");
        fs.createReadStream("D:\\StudentSystem\\public\\assets\\student_details.csv")
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
                        console.log("Data to be insert : ", data);
                        studentModel.insertRecord(data);
                });
}
module.exports = {
        listView,
        insertView,
        updateView,
        insertInitiative,
        updateInitiative,
        removeInitiative,
        upload_csv,
};
