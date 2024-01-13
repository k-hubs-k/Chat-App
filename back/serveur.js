const express = require("express")
const mysql = require("mysql")
const cors = require("cors")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud"
})

app.get('/', (req, res) => {
    const sql = "SELECT * FROM students"
    db.query(sql, (erreur, resultat) => {
        if (erreur) return res.json({Message: "Erreur inside server"})
        return res.json(resultat)
    })
})

app.post('/student', (req, res) => {
    const sql = "INSERT INTO students (`name`,`email`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql, [values], (erreur, resultat) => {
        if (erreur) return res.json(erreur)
        return res.json(resultat)
    })
})

app.listen(PORT, () => {
    console.log(`le serveur est lancer sur le port ${PORT}`);
})