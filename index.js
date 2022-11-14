const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./db/config');
require('dotenv').config();

//Create server
const app = express();

//DB connection
dbConnection();

//Public directtory
app.use(express.static('public'));

//CORS
app.use(cors());

//Read and parse of body
app.use(express.json());

//Routers
app.use('/api/auth', require('./routes/auth.routes'));

//Managing other routes
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
})

//Run server
app.listen(process.env.PORT, () => {
    console.log(`Server is running now in port ${process.env.PORT}`)
});

