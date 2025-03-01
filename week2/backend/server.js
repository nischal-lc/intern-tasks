const express = require('express');
const app = express();
const router = require('./routes');

app.use(express.json());
app.use((req, res, next)=>{
    next();
})
app.use("/api/earthquakes", router);

app.listen(5500, ()=>{
    console.log('Server is running on port 5500');
})