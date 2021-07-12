const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const userSchema = new Schema({
  amazonId: { required: false, type: String },
  githubId: { required: false, type: String },
  googleId: { required: false, type: String },
  username: { required: false, type: String }
});


const User = mongoose.model('user', userSchema);


module.exports = User;