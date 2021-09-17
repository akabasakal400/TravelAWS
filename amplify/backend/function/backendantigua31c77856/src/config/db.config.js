module.exports = {
    HOST : "db-antigua-travel.cvtwhgrgjo06.us-east-2.rds.amazonaws.com",
    USER : "admin",
    PASSWORD : "39DRWP2J9ZY8xQmjTFlD",
    DB : "antigua_sp",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}