import express from "express";
import dotenv from "dotenv";
const app = express();
const PORT = process.env.PORT || 8000;
dotenv.config();

app.get("/", (req, res)=>{
    res.send("Welcome to the server - GET")
})
app.post("/", (req, res)=>{
    res.send("Welcome to the server - POST")
})
app.put("/", (req, res)=>{
    res.send("Welcome to the server - PUT")
})
app.delete("/", (req, res)=>{
    res.send("Welcome to the server - DELETE")
})

app.get("/watch" , (req, res) => {
    console.log (req.url)
    console.log (req.method)
    console.log (req.headers)
    console.log (req.query)
    console.log (req.params)
    console.log (req.body)
    res.send("Welcome to watch list")
});
app.listen(PORT, ()=>{
    console.log(`https://localhost:${PORT}`)
})