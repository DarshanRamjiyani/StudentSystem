const mysql = require('mysql');

const host = '127.0.0.1';

const user = 'root';

const password = '';

const database = 'student_system';

function getMySqlConnection(){
    let connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    });

    connection.connect((error)=> {
        if(!error)
        {
            console.log('Connection Established Successfully');
            return connection;
        }
        else
        {
            console.log('Connection Failed!'+ JSON.stringify(error,undefined,2));
            return null;
        }
    });
}

module.exports = {getMySqlConnection};