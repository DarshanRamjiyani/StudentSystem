const baseModel = require("./baseModel");

const table = "students";
const field_firstName = "first_name";
const field_lastName = "last_name";
const field_subjects = "subjects";
const field_age = "age";
const field_grade = "grade";
const field_avgScore = "avg_score";
const field_image = "image";

function insertRecords(data) {
  let connection = require("./baseModel");

  console.log("--INSERT--");

  connection.getMySqlConnection();

  for (let subData of data) {
    let { fn, ln, sub, age, grade, avgScore, img } = subData;

    console.log("fn : ${fn}");

    if (connection) {
      let query =
        "INSERT INTO `" +
        table +
        "` (`" +
        field_firstName +
        "`, `" +
        field_lastName +
        "`, `" +
        field_subjects +
        "`, `" +
        field_age +
        "`, `" +
        field_grade +
        "`, `" +
        field_image +
        "`, `" +
        field_avgScore +
        '`) VALUES ("' +
        fn +
        '", "' +
        ln +
        '", "' +
        sub +
        '", "' +
        age +
        '", "' +
        grade +
        '", "' +
        img +
        '", "' +
        avgScore +
        '");';
        connection.query(query, (error, row, fields) => {
          if(!error)
          {
            console.log("Row data : " + row);
            return row;
          }
          else{
            console.log(error);
          }
        });
    }
  }
}

module.exports = { insertRecords };