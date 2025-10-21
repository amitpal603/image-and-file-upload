require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')

connectDB()
const app =  express()
app.use(express.json())

app.get('/', (req,res) => {
    res.send('Image upload api')
})

const PORT  = process.env.PORT || 3000

app.listen(PORT , () => {
    console.log(`server listen on http://localhost:${PORT}`)
})