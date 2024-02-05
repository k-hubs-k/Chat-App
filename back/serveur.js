import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";
import process from "process";
import dotenv from "dotenv";
import { login, register } from "./utils/login.js";
import { getUser } from "./utils/profile.js";
import { editProfile } from "./utils/profile.js";
import {
  getChats,
  getConversations,
  sendMessages,
} from "./utils/conversations.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.REMOTE_URL],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

const middleware = session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24,
  },
});

app.use(middleware);

const socketPath = "/socket";
io.path(socketPath);

io.on("connection", (socket) => {
  socket.on("disconection", () => {
    socket.disconnect();
  });
  socket.on("hey", () => {
    io.emit("hey", "hello");
  });

  socket.on("get messages", (data) => {
    const { id, target } = data;
    console.log("data : ", data);
    getChats(id, target, (err, conversations) => {
      if (!err) io.emit("receive message", { msg: conversations, target: id });
    });
  });

  socket.on("send messages", (_id, _target) => {
    getChats(_id, _target, (err, conversations) => {
      if (!err)
        io.emit("receive message", { msg: conversations, target: _target });
    });
  });
});

app.get("/", (req, res) => {
  return res.json(req.session.userActive);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const data = { username: username, password: password };
  login(data, (err, _res) => {
    if (err) {
      return res.json({ Error: "Error inside server" });
    } else if (_res) {
      const result = _res;
      const newSession = {
        userId: result.id,
        username: result.username,
        email: result.email,
        images: result.images,
      };
      req.session.userActive = newSession;
      return res.json({ Succes: "Logged in succcesfully..." });
    } else {
      return res.json({ Error: "Check your information and try again..." });
    }
  });
});

app.post("/register", (req, res) => {
  register(req.body, (err, _res) => {
    if (err) {
      return res.json({ Error: "Failed to create new user" });
    } else if (_res) {
      return res.json(_res);
    }
  });
});

app.get("/profile", (req, res) => {
  const userId = req.session.userActive.userId;
  if (userId)
    getUser(userId, (err, _res) => {
      if (err) {
        return res.json({ Error: "Error inside server" });
      } else {
        return res.json(_res);
      }
    });
});

app.get("/profile/:id", (req, res) => {
  const userId = req.params.id;
  getUser(userId, (err, _res) => {
    if (err) {
      return res.json({ Error: "Error inside server" });
    } else {
      return res.json(_res);
    }
  });
});

app.put("/edit", (req, res) => {
  const userId = req.session.userActive.userId;
  const { name, email, pass } = req.body;
  const newProfile = { userId, name, email, pass };
  editProfile(newProfile, (err, result) => {
    if (err) {
      return res.json({ Error: "Can not edit this profile" });
    } else if (result) {
      req.session.userActive.userName = name;
      req.session.userActive.email = email;
      return res.json(result);
    }
    console.log(result);
  });
});

app.get("/conversation", (req, res) => {
  if (req.session.userActive.userId) {
    const userId = req.session.userActive.userId;
    getConversations(userId, (err, conversations) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json({ active: userId, Conversations: conversations });
      }
    });
  }
});

app.get("/conversation/:target", (req, res) => {
  const { target } = req.params;
  const userId = req.session.userActive.userId;
  getChats(userId, target, (err, chats) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(chats);
    }
  });
});

app.post("/send", (req, res) => {
  if (!req.session.userActive.userId) return;
  const values = [
    req.session.userActive.userId,
    req.body.target_id,
    req.body.message,
    req.body.date1,
  ];
  sendMessages(values, (err, result) => {
    if (err) {
      return res.json({ Error: "Can not send this message :", err });
    } else if (result.Succes) {
      return res.json({ Succes: "Sent..." });
    }
  });
});

app.get("/user/:id", (req, res) => {
  if (req.params.id)
    getUser(req.params.id, (err, _res) => {
      if (err) return;
      return res.json(_res.user);
    });
});

app.post("/logout", (req, res) => {
  req.session.destroy();
  return res.json({ Succes: "Disconnected..." });
});

httpServer.listen(PORT, () => {
  console.log(`Server started at port ${PORT} 🚀️`);
});
