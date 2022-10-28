const express = require('express');
const cors = require('cors');
require('dotenv').config();

//To avoid nodemon crash
process.once('SIGUSR2', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
  
process.on('SIGINT', function () {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, 'SIGINT');
});

//Create server
const app = express();

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

