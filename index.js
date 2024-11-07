import express from "express";
import env from "dotenv";
import pg from "pg";
const port = process.env.port || 3000;
const app = express();
env.config();


let result;
const db = new pg.Client ({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port
});
db.connect();

db.query("SELECT * FROM credentials", (err, res) =>{
    if(err){
        console.log("Entered error", err.stack)
    } else {
        result = res.rows
        
    }
});
app.get("/", (req, res) =>{
   
    res.render("index.ejs");
    console.log(result);
});

app.get("/result", (req, res) =>{
    res.render("result.ejs", {result});
})

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});