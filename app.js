// Requiring packages..
const express = require("express");
const path = require("path");
require("dotenv").config();
const db = require("./db");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 8080;

// ================= Routes ===================

// Home Page - Show all tasks
app.get("/", (req, res) => {
  const q = "SELECT * FROM tasks ORDER BY id DESC";
  db.query(q, (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Database error");
    }
    res.render("home", { tasks: result });
  });
});

// Add a new task
app.post("/add-tasks", (req, res) => {
  const task = req.body.task;
  if (!task) return res.json({ success: false });

  const q = "INSERT INTO tasks(title) VALUES (?)";
  db.query(q, [task], (err, result) => {
    if (err) return res.json({ success: false });
    res.json({ success: true, id: result.insertId });
  });
});

// Toggle Complete
app.post("/complete/:id", (req, res) => {
  const id = req.params.id;
  const q = "UPDATE tasks SET is_completed = NOT is_completed WHERE id = ?";
  db.query(q, [id], () => {
    res.json({ success: true });
  });
});

// Delete one
app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM tasks WHERE id = ?";
  db.query(q, [id], () => {
    res.redirect("/");
  });
});

// Delete all
app.get("/delete-all", (req, res) => {
  const q = "TRUNCATE TABLE tasks";
  db.query(q, () => {
    res.redirect("/");
  });
});

// ================= Server ===================
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
