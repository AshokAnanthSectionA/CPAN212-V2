import express from 'express'
import lab_router from './routers/lab_router.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use("/lab", lab_router);
// localhost:8000/lab

app.get("/", (req, res) => {
    res.send("Welcome to the lab router")
})

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`)
})