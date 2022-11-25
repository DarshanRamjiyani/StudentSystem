const e = require("express");
const baseModel = require("./baseModel");

const table = "students";
const field_id = "id";
const field_firstName = "first_name";
const field_lastName = "last_name";
const field_subjects = "subjects";
const field_age = "age";
const field_grade = "grade";
const field_avgScore = "avg_score";

async function getRecord(column, whereClause, limit) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT " + column + " FROM " + table;

    if(whereClause !== null && typeof(whereClause) !== "undefined" && whereClause !== "")
        sql = sql + " WHERE " + whereClause;
    limit === null || typeof limit === "undefined"
      ? (sql = sql + "")
      : sql = sql + " LIMIT " + limit;

    sql = sql + ";";
    console.log("WHERE ", whereClause)
    console.log("SQL : ", sql)
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
    let sql = "INSERT INTO `"+table+"`(`"+field_firstName+"`, `"+field_lastName+"`, `"+field_age+"`, `"+field_subjects+"`, `"+field_avgScore+"`, `"+field_grade+'`) VALUES ("';
    for (let subData of data) {
      let { firstName, lastName, subjects, age, grade, avgScore} = subData;
      let sub = "";
      if(typeof(subjects) === "object"){
        let sub = "";
        subjects.forEach(element => {
          sub = sub+element+",";
        });
      }
      else{
        sub = subjects;
      }
      console.log(sub);
      sql = sql + firstName +'","'+lastName+'","'+age+'","'+sub+'","'+avgScore+'","'+grade+'");';
      baseModel.getMySqlConnectionConfig().then((connection) => {
        if (connection != null) {
          connection.query(sql, (error, row, fields) => {
            if (!error) {
              console.log("insert success.")
              resolve(row);
            } else {
              console.log(error);
              reject(error);
            }
          });
        }
      });


    }
  }
  );
}

async function updateRecord(userId, data) {
  return new Promise((resolve, reject) => {
    const updateField = Object.keys(data[0]);
    let sql = "UPDATE `" + table + "` SET";
    let updateFieldLength = updateField.length;
    let count = 1;
    updateField.forEach(element => {
      sql = sql + " `" + element + "` = ";
      switch (typeof (data[0][element])) {
        case 'string': sql = sql + ' "' + data[0][element] + '"'; break;
        case 'number': sql = sql + ' ' + data[0][element] + ' '; break;
        default: sql = sql + ' "' + data[0][element] + '"'; break;
      }
      if (count !== updateFieldLength) {
        sql = sql + ",";
      }
      count = count + 1;
    });
    sql = sql + " WHERE id=" + userId + ";";
    baseModel.getMySqlConnectionConfig().then((connection) => {
      if (connection != null) {
        connection.query(sql, (error, row, fields) => {
          if (!error) {
            console.log("update success.")
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

async function removeRecord(userId) {
  return new Promise((resolve, reject) => {
    let sql = "DELETE FROM `" + table + "` WHERE `" + field_id + "` =" + userId + ";";
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


module.exports = { getRecord, insertRecord, updateRecord, removeRecord };
