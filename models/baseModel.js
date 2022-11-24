const mysql = require('mysql');

const host = '127.0.0.1';

const user = 'root';

const password = '';

const database = 'student_system';

async function getMySqlConnectionConfig(){
    let connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    });
    return connection
}

module.exports = {getMySqlConnectionConfig};