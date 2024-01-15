const express = require("express")
const mysql = require("mysql")
const cors = require("cors")
const jwt = require("jsonwebtoken")

require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"chatapp"
})

app.get('/', (req, res) => {
    const sql = "SELECT * FROM users"
    db.query(sql, (erreur, resultat) => {
        if (erreur) return res.json({Message: "Erreur inside server"})
        return res.json(resultat)
    })
})

// ------------------------ mbl ts mety ------------------------------

app.get('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE `username` = ? AND `password` = ?";
    const values = [
        req.body.username,
        req.body.password
    ]
    console.log(req.body);
    db.query(sql, values, (err, data) => {
        if (err) {
            return res.json("Erreur")
        }
        if (data.length > 0) {
            const id = data[0].id
            const token = jwt.sign({id}, "jwtSecretkey", {expiresIn: 300})
            return res.json({Login: true, token, data})
        } else {
            return res.json("Faile")
        }
    })
})

// ---------------------------------------------

app.post('/users', (req, res) => {
    const sql = "INSERT INTO users (`username`,`email`,`password`) VALUES (?)"
    const values = [
        req.body.username,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, resultat) => {
        if (err) return res.json(err)
        return res.json(resultat)
    })
})

app.get('/users/:id', (req, res) => {
    const sql = "SELECT * FROM users WHERE id = ?"
    const id = req.params.id
    db.query(sql, [id], (erreur, resultat) => {
        if (erreur) return res.json({Message: "Erreur inside server"})
        return res.json(resultat)
    })
})

// app.put('/update/:id', (req, res) => {
//     const sql = 'UPDATE students SET `name=?`, `email=?`, `password` WHERE id=?'
//     const id = req.params.id
//     db.query(sql, [req.body.name, req.body.email, id], (err, resultat) => {
//         if (erreur) return res.json({Message: "Erreur inside server"})
//         return res.json(resultat)
//     })
// })

app.listen(PORT, () => {
    console.log(`le serveur est lancer sur le port ${PORT}`);
})