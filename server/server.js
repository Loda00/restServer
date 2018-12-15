require('./config/config')
const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use( require('./routes/user'))

// sudo service mongodb start
// mongo

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true }, (err, res) => {
    if (err)
        throw new Error('It was found a error')
    
    console.log('Mongo Online')
    
})


app.listen(port, () => {
    console.log(`running port ${port} => 200`)
})
