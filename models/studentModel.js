const baseModel = require("./baseModel");

const table = "students";
const field_firstName = "first_name";
const field_lastName = "last_name";
const field_subjects = "subjects";
const field_age = "age";
const field_grade = "grade";
const field_avgScore = "avg_score";
const field_image = "image";

async function getRecord(column, whereClause, limit) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT " + column + " FROM " + table;

    whereClause === null || typeof whereClause === "undefined"
      ? (sql = sql + "")
      : sql + " WHERE " + whereClause;
    limit === null || typeof limit === "undefined"
      ? (sql = sql + "")
      : sql + " LIMIT " + limit;

    sql = sql + ";";

    baseModel.getMySqlConnectionConfig().then((connection) => {
      if (connection != null) {
        connection.query(sql, (error, row, fields) => {
          if (!error) {
            resolve(row);
          } else {
            console.log(error);
            reject(error);
          }
        });
      }
    });
  });
}

async function insertRecord(data) {
  return new Promise((resolve, reject) => {
    for (let subData of data) 
    {
      let { firstName, lastName, subjects, age, grade, avgScore, image } = subData;
      console.log("fn : ${firstName}");
      baseModel.getMySqlConnectionConfig().then((connection) => {
        if(connection != null)
        {
          connection.query(sql, (error, row, fields) => {
            if (!error) {
              resolve(row);
            } else {
              console.log(error);
              reject(error);
            }
          });
        }
      });

      
    }}
  );
}

module.exports = { getRecord, insertRecord };
