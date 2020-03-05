const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
 
const ProductsSchema = new Schema({
  // author: ObjectId,
  coverImage: String,
  name:{ type: String,required: true, max: [60, '最大60文字までです']},
  price: Number,
  describe: String,
  heding1: String,
  heding2: String,
  heding3: String,
  hedingDec1: String,
  hedingDec2: String,
  hedingDec3: String
});

module.exports = mongoose.model('Products', ProductsSchema)
