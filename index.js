const express = require('express');
const cors = require('cors');

//Create server
const app = express();

//CORS
app.use(cors());

//Read and parse of body
app.use(express.json());

//Routers
app.use('/api/auth', require('./routes/auth.routes'));

//Run server
app.listen(4000, () => {
    console.log(`Server is running now in port ${4000}`)
});

