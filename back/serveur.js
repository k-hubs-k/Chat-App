import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";

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

const db = mysql.createConnection({
  host: "localhost",
  user: "hubs",
  password: "hubs",
  database: "chatapp",
});

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
  const id = req.params.id;
  db.query(sql, [req.session.username], (erreur, resultat) => {
    if (erreur) return res.json({ Message: "Erreur inside server" });
    return res.json(resultat);
  });
});

// app.put('/update/:id', (req, res) => {
//     const sql = 'UPDATE students SET `name=?`, `email=?`, `password` WHERE id=?'
//     const id = req.params.id
//     db.query(sql, [req.body.name, req.body.email, id], (err, resultat) => {
//         if (erreur) return res.json({Message: "Erreur inside server"})
//         return res.json(resultat)
//     })
// })

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT} 🚀️`);
});
