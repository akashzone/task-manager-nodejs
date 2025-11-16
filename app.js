//Requiring packages..
const express = require("express");
require("dotenv").config();


const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));


let port = 8080;

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});


connection.connect((err) => {
  if (err) {
    console.error("Connection error:", err);
  } else {
    console.log("Connected to MySQL!");
  }
});

// Routing's
app.get("/", (req, res) => {
  let q = "SELECT * from tasks";
  try {
    connection.query(q, (err, result) => {
      res.render("home",{users : result});
    });
  } catch (error) {
    console.log("Error:" + error);
    res.send("Error occured!")
  }
});

app.post("/add-tasks", (req, res) => {
  
  let { task } = req.body;  
  if(task === ""){
    res.send("Please enter a valid task!");
    return;
  }
  // console.log(task);

  let q = "INSERT INTO tasks(title) VALUES (?)";

  connection.query(q, [task], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

app.post("/complete/:id", (req, res) => {
  const id = req.params.id;

  const q = "UPDATE tasks SET is_completed = NOT is_completed WHERE id = ?";

  connection.query(q, [id], () => {
    res.redirect("/");
    });
  });


app.get("/delete/:id",async (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM tasks WHERE id = ?";

  connection.query(q, [id], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.get("/delete-all",async (req, res) => {
  const q = "TRUNCATE TABLE tasks";

  connection.query(q, (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.get("/add-tasks",(req,res)=>{
    res.render("add");
});
app.listen(port, () => {
  console.log("Server is live");
});
