const express = require('express');
const app = express();

require('./DBConn/conn');

const PORT =  4000; 

app.get('/', (req, res) => {
    res.send('Gym Management System backend is running ✅');
});

app.listen(PORT, () => {
    console.log(`Server is running on port no : ${PORT}`);
});
