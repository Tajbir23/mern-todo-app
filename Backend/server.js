const express = require('express');
const mongoose = require('mongoose');
const routes = require('./Routes/taskRoutes');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());
app.use(cors())

const connection = async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/users').then(() => {
            console.log('database is connected')
        })
        
    } catch (error) {
        console.log(error)
    }
};


app.listen(port, async()=>{
    console.log(`server is running at http://localhost:${port}`)
    await connection()
})

app.use('/api/users', routes)
