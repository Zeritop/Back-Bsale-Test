import mysql from 'mysql';

const connection = mysql.createPool({
    host    :   process.env.host || 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
    user    :   process.env.user || 'bsale_test',
    password:   process.env.password || 'bsale_test',
    database:   process.env.database || 'bsale_test'
});

// connection.getConnection((err) => {
//     if(err){
//         console.log(err.code)
//         console.log(err.fatal)
//     }
//     console.log('DB connected')
// })

export default connection