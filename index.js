const express = require('express');
const cors = require('cors');
require('dotenv').config();

//Create server
const app = express();

//Public directtory
app.use(express.static('public'));

//CORS
app.use(cors());

//Read and parse of body
app.use(express.json());

//Routers
app.use('/api/auth', require('./routes/auth.routes'));

//Run server
app.listen(process.env.PORT, () => {
    console.log(`Server is running now in port ${process.env.PORT}`)
});

