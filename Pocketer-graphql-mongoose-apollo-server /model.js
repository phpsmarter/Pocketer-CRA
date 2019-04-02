const mongoose = require('mongoose');
const { Schema } = mongoose;

const News = new Schema({
  cate:String,
  title: String,
  source: String,
  time: String,
  url:String,
  excerpt:String,
  saveCount:String,
  imageUrl:String,
});

const newsModel = mongoose.model('News', News); 

module.exports = {
  newsModel
};