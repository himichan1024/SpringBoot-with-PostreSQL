const express = require('express')
const pool = require('./db')
const port = 1337

const app = express()
app.use(express.json())

//routes
app.get('/', async (req, res) => {
    try{
        const data = await pool.query('SELECT * FROM schools')
        res.status(200).send({children: data.rows})
    } catch (err){
        console.log(err)
        res.sendStatus(500)
    }
})

app.post('/', async (req, res) => {
    const { name, location } = req.body
    try{
        await pool.query('INSERT INTO schools (name, address) VALUES ($1, $2)', [name , location])
        res.status(200).send({message: "Success"})
    } catch (err){
        console.log(err)
        res.sendStatus(500)
    }
    res.status(200).send({
        message: `${name}, ${location}`
    })
})

// SQL call
app.get('/setup', async (req, res) => {
    try{
        await pool.query('CREATE TABLE schools( id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))')
    } catch (err){
        console.log(err)
        res.sendStatus(500)
    }
})

app.listen(port, () => console.log(`Server has started on port: ${port}`))