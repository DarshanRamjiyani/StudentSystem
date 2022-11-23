/*
  Admin database model. Handel all the DB operation in of the admin table.
*/

const baseModel = require("./baseModel");

const table = "admins";
const field_fullName = "full_name";
const field_username = "username";
const field_authkey = "authkey";

function getAuthKey(username){
  
  let connection = baseModel.getMySqlConnection();

  if(connection != null)
  {
    connection.query('SELECT `'+ field_authkey +'` FROM '+table+' WHERE username="'+username+'" LIMIT 1;', (error, row, fields) => {
      if(!error)
      {
        return row;
      }
      else{
        console.log(error);
      }
    });
  }
}


function registerAdmin(fullName, username, authkey)
{
  console.log("registerAdmin - true");
  let connection = baseModel.getMySqlConnection();

  if(connection)
  {
    console.log("IF");
    let query = 'INSERT INTO `'+table+'` (`'+field_fullName+'`, `'+field_username+'`, `'+field_authkey+'`) VALUES("'+fullName+'", "'+username+'", "'+authkey+'");';
    console.log(query);
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

module.exports = {getAuthKey, registerAdmin};