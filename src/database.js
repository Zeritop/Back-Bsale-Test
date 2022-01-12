import mysql from 'mysql';

//se realiza la coneccion con la base de datos
const connection = mysql.createPool({
    host    :   process.env.host || 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
    user    :   process.env.user || 'bsale_test',
    password:   process.env.password || 'bsale_test',
    database:   process.env.database || 'bsale_test'
});

export default connection