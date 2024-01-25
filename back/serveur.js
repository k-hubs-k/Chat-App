import express from "express";
import fs from "fs";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import readline from "readline";
import multer from "multer";
import path from "path";

dotenv.config();

const app = express();
const PORT = 8081 || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUnitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

app.use(express.static("public"))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})

// Get a data typed on backend user keyborard
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Variables for connection to mysql database
let username = "";
let password = "";
let db;

// A login system to the mysql database
rl.question("Enter your mysql server username : ", function (_name) {
  rl.question("Enter your password : ", function (_pwd) {
    (username = _name), (password = _pwd);
    rl.close();

    // Connection to mysql database
    db = mysql.createConnection({
      host: "localhost",
      user: username,
      password: password,
      database: "chatapp",
    });

    // Open the port for frontend
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT} 🚀️`);
    });
  });
});

let img = ''

app.get("/all", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (erreur, resultat) => {
    if (erreur) return res.json({ Message: "Erreur inside server" });
    return res.json(resultat);
  });
});

app.get("/", (req, res) => {
  if (req.session.username) {
    return res.json({
      isLoggedIn: true,
      username: req.session.username,
    });
  } else {
    return res.json({
      isLoggedIn: false,
    });
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE `username` = ? AND `password` = ?";
  db.query(sql, [username, password], (err, data) => {
    if (err) {
      return res.json({
        Error: "Internal server error...",
      });
    }
    if (data.length > 0) {
      req.session.username = data[0].id;
      console.log(req.session.username);
      return res.json({
        Succes: "Connected...",
      });
    } else {
      return res.json({
        Error: "Username or password wrong. Check it and try again",
      });
    }
  });
});

app.post("/logout", (req, res) => {
  // to delete session
  req.session.destroy();
  return res.json({ Succes: "Disconnected..." });
});

app.post("/users", (req, res) => {
  // Getting information from form
  const { username, email, password } = req.body;
  // Check if this user already exists
  const check = "SELECT * FROM users WHERE `username` = ? OR `email` = ?";
  db.query(check, [username, email], (err, _res) => {
    if (err) return res.json({ Error: "Internal server error..." });
    if (_res.length > 0) {
      // Already exists
      return res.json({ Warning: "This user already exists" });
    }
    const sql = "INSERT INTO users (`username`,`email`,`password`) VALUES (?)";
    const values = [username, email, password];
    db.query(sql, [values], (err, resultat) => {
      if (err) return res.json({ Error: err });
      return res.json({ Succes: resultat });
    });
  });
});

app.get("/profil/:id", (req, res) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    const id = req.session.username;
    db.query(sql, [id], (erreur, resultat) => {
        img = resultat[0].images;
        if (erreur) return res.json({ Message: "Erreur inside server" });
        return res.json(resultat);
    });
});

app.post('/upload', upload.single("image"), (req, res) => {
  const image = req.file.filename;
  const ID = req.session.username;
  console.log(img);
  if (fs.existsSync("./public/images/"+img)) {
    fs.unlink('./public/images/'+img, (erreur) => {
        if (erreur) {
            console.log(erreur);
        }
    })
  } else {
      console.log("le fichier n'existe pas");
  }
  const sql = 'UPDATE users SET `images` = ? WHERE id = ?';
  db.query(sql, [image, ID], (err, resultat) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Status: "Succes" });
  });
})

app.put('/edit', (req, res) => {
  const sql = 'UPDATE users SET `username` = ?, `email` = ?, `password` = ? WHERE id = ?'
  const ID = req.session.username;
  const values = [
      req.body.name,
      req.body.email, 
      req.body.pass
  ]
  db.query(sql, [...values, ID], (err, resultat) => {
      if (err) return res.json({Message: "Erreur inside server"}) 
      return res.json(resultat) 
  })
})

app.delete('/delete/:id', (req, res) => {
  const sql = 'DELETE FROM students WHERE id = ?'
  const ID = req.session.username;
  db.query(sql, [ID], (err, resultat) => {
      if (err) return res.json({Message: "Erreur inside server"}) 
      return res.json(resultat)
  })
})
