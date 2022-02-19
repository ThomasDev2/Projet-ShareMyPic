const mongoose = require('mongoose');

const imgSchema = new mongoose.Schema({
    name: String,

    path:{
      data: Buffer,
      contentType: String
  },
    desc:String,
    author:String,
});

module.exports = mongoose.model('Image', imgSchema);