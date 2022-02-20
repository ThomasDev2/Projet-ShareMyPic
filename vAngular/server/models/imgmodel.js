const mongoose = require('mongoose');

const imgSchema = new mongoose.Schema({
    roomId:String,
    title: String,
    content:{
      data:Buffer,
      contentType:String
  },
    desc:String,
    author:String,
});

module.exports = mongoose.model('Image', imgSchema);