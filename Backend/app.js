const express = require("express");
const app =express()

app.get("/", (req,res)=>{
    console.log("hi")
})


app.listen(3000)