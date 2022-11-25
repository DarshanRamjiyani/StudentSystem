/*
  Admin database model. Handel all the DB operation in of the admin table.
*/

const baseModel = require("./baseModel");

const table = "admins";
const field_fullName = "full_name";
const field_username = "username";
const field_authkey = "authkey";

async function getAuthKey(username) {
  return new Promise((resolve, reject) => {
    baseModel.getMySqlConnectionConfig().then((connection) => {
      if (connection != null) {
        const sql =
          "SELECT `" +
          field_authkey +
          "` FROM " +
          table +
          ' WHERE username="' +
          username +
          '" LIMIT 1;';
          console.log(sql);
        connection.query(sql, (error, row, fields) => {
          if (!error) {
            console.log("ROW : ", row);
            resolve( row[0]["authkey"])
          } else {
            console.log(error);
            reject(error);
          }
        });
      }
    });
  });
}

async function registerAdmin(fullName, username, authkey) {
  baseModel.getMySqlConnectionConfig().then(
    (connection) => {
      connection.connect((error) => {
        if (!error) {
          if (connection) {
            let md5 =  require('md5');
            let query =
              "INSERT INTO `" +
              table +
              "` (`" +
              field_fullName +
              "`, `" +
              field_username +
              "`, `" +
              field_authkey +
              '`) VALUES("' +
              fullName +
              '", "' +
              username +
              '", "' +
              md5(authkey) +
              '");';
            connection.query(query, (error, row, fields) => {
              if (!error) {
                return row;
              } else {
                console.log(error);
              }
            });
          }
        } else {
          console.log(
            "Connection Failed!" + JSON.stringify(error, undefined, 2)
          );
        }
      });
    },
    (error) => {
      console.log("Error");
    }
  );
}

module.exports = { getAuthKey, registerAdmin };
