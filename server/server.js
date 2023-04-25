const express = require('express'); 
const app = express(); 
const port = process.env.PORT || 3030; 

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 

// create a GET route
app.get('/prueba', (req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});