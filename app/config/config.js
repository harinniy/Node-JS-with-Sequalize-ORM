const env = process.env.ENV || process.env.NODE_ENV || 'development'

module.exports = {
    "development": {
        "username": "root",
        "password": "mydreamgf",
        "database": "TestDB",
        "host": "localhost",
        "dialect": "mysql"
    },
    "test": {
       "username": "root",
        "password": "",
        "database": "",
        "host": "",
        "dialect": "mysql"
    },
    "prodcution": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOSTNAME,
        "dialect": 'mysql'
    }
}
