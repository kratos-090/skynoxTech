const express=require('express');
require('./db/mongoose');
const userRouter=require('./routers/user');

const app=express();


app.get('', (req, res) => {
    res.send("api'sr running");
})
app.use(express.json());
app.use(userRouter);


module.exports=app;



 
