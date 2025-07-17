const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB)
.then(() => console.log('DB connection successful!')).catch(err=>{
  console.log(err)
});