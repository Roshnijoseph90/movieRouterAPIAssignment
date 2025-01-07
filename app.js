const express = require('express')
const path = require('path')
const moviesRouter = require('./routers/moviesRouter');
const app = express()
app.use(express.json())
app.use('/movies',moviesRouter)

app.get('/',(req,res)=>{
   
   
    res.sendFile(path.join(__dirname,"/index.html"))
})
app.listen(3000,()=>{
   
    console.log("server started....")
})