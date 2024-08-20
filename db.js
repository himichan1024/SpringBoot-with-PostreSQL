const {Pool} = require('pg')
const pool = new Pool({
    host: 'db',
    port: 5432,
    user: 'postgresql',
    password: 'admin',
    database: 'pg-db'
})

module.exports = pool