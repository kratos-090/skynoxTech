// checking data connection for the database

const mongoose = require('mongoose');

mongoose.connect( process.env.MONGOGB_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify: true,
    useUnifiedTopology:true
});
