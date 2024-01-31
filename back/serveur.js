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

app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname),
    );
  },
});

const upload = multer({
  storage: storage,
});

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
      charset : 'utf8mb4',
    });

    // Open the port for frontend
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT} 🚀️`);
    });
  });
});

let img = "";

app.get("/all", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (erreur, resultat) => {
    if (erreur) return res.json({ Message: "Erreur inside server" });
    return res.json(resultat);
  });
});

async function fetchUserData(id) {
  const sql = "SELECT * FROM users WHERE id = ?";
  try {
    const results = await queryDatabase(sql, [id]);
    return results[0]; // Retourne la première ligne de résultats
  } catch (error) {
    console.error(error);
    return null;
  }
}

app.get("/", (req, res) => {
  if (req.session.username) {
    return res.json({
      isLoggedIn: true,
      username: req.session.username,
      id: req.session.userId,
      img: req.session.img,
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
      req.session.username = data[0].username;
      req.session.userId = data[0].id;
      req.session.img = data[0].images;
      req.session.email = data[0].email;
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
    db.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: err });
      return res.json({ Succes: result });
    });
  });
});

app.get("/profil/:id", (req, res) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  const id = req.session.userId;
  db.query(sql, [id], (erreur, resultat) => {
    if (erreur) return res.json({ Message: "Erreur inside server" });
    img = req.session.img;
    return res.json(resultat);
  });
});

app.post("/upload", upload.single("image"), (req, res) => {
  const image = req.file.filename;
  const ID = req.session.userId;
  if (fs.existsSync("./public/images/" + img)) {
    fs.unlink("./public/images/" + img, (error) => {
      if (error) {
        console.log(error);
      }
    });
  } else {
  }
  console.log("This file doesn't exists");
  const sql = "UPDATE users SET `images` = ? WHERE id = ?";
  db.query(sql, [image, ID], (err, resultat) => {
    if (err) return res.json({ Message: "Error" });
    req.session.img = image;
    return res.json({ Status: "Succes" });
  });
});

app.put("/edit", (req, res) => {
  const sql =
    "UPDATE users SET `username` = ?, `email` = ?, `password` = ? WHERE id = ?";
  const ID = req.session.userId;
  const values = [req.body.name, req.body.email, req.body.pass];
  db.query(sql, [...values, ID], (err, resultat) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(resultat);
  });
});

app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM students WHERE id = ?";
  const ID = req.session.userId;
  db.query(sql, [ID], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

function queryDatabase(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

app.get("/conversation", (req, res) => {
  const sql =
    "SELECT * FROM conversations WHERE to_id = ? ORDER BY id DESC";
  const id = req.session.userId;
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Message: "Error inside server" });
    }
    let user_id = [];
    let lastChat = [];
    result.map((item) => {
      let toCheck = item.from_id == id ? item.to_id : item.from_id;
      if (user_id.indexOf(toCheck) == -1) {
        user_id.push(toCheck);
        lastChat.push(item.content);
      }
    });
    (async () => {
      let out = [];
      for (let i = 0; i < user_id.length; i++) {
        const userData = await fetchUserData(user_id[i]);
        out.push({
          user_id: userData.id,
          username: userData.username,
          email: userData.email,
          images: userData.images,
          conversation: lastChat[i],
        });
      }
      return res.json(out);
    })();
  });
});

app.get("/conversation/:id", (req, res) => {
  const target_id = req.params.id;
  const id = req.session.userId;
  console.log("here : ", id, target_id);
  const sql =
    "SELECT * FROM conversations WHERE from_id = ? AND to_id = ? OR from_id = ? AND to_id = ?";
  db.query(sql, [id, target_id, target_id, id], (err, result) => {
    if (err) {
      return res.json({ Message: "Error inside server" });
    }
    console.log("test : ", result);
    (async () => {
      const target_info = await fetchUserData(target_id);
      const out = { you: id, conversations: result, target_info: target_info };
      return res.json(out);
    })();
  });
});

app.post("/send", (req, res) => {
    const fromId = req.session.userId;
    const toId = req.body.target_id;
    const content = req.body.message;
    const time = req.body.date1;
    const sql = "INSERT INTO conversations (`from_id`,`to_id`,`content`,`time`) VALUES (?)";
    const values = [fromId, toId, content, time];
    db.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: err });
      return res.json({ Succes: result });
    });
});