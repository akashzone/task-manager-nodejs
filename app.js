//Requiring packages..
const express = require("express");
const mySql2 = require("mysql2");

const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));


let port = 8080;

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root@1234", // your MySQL password
  database: "todo_data", // your db name
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
  console.log(task);

  let q = "INSERT INTO tasks(title) VALUES (?)";

  connection.query(q, [task], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});
app.post("/complete/:id",(req,res)=>{
    app.post("/complete/:id", (req, res) => {
  const id = req.params.id;

  const q = "UPDATE tasks SET is_completed = NOT is_completed WHERE id = ?";

  connection.query(q, [id], () => {
    res.redirect("/");
  });
});

})

app.get("/add-tasks",(req,res)=>{
    res.render("add");
})
app.listen(port, () => {
  console.log("Server is live");
});
