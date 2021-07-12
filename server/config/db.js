const mongoose = require('mongoose');
const keys     = require('./keys');


const connectDB = () => {
  console.log("connectDB() called.");


  mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    // , useCreateIndex: true
  });


  mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance!');
  });
  
  
  mongoose.connection.on('error', err => {
    console.error('Error connecting to mongo :(', err);
    process.exit(1); // Stop everything (1 is for failure).
  });
}; // End of connectDB()


module.exports = connectDB;
