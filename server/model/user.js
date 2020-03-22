const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
const bcrypt = require('bcrypt'); // bcryptをimport: bcryptのお作法
 
const UserSchema = new Schema({
  // author: ObjectId,
  username:{ 
      type: String,
      required: true,
      max: [60, 'ユーザー名は最大60文字までです']
    },
  email: { 
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      max: [60, 'Eメールは最大60文字までです']},
  password: { 
      type: String,
      required: true,
      max: [30, 'パスワードは最大30文字までです'],
      min: [6, 'パスワードは6文字以上で入力してください']}
});

UserSchema.methods.hasSamePassword = function(inputPassword){
  const user = this; // 呼び出し元のusersの情報が入る
  return bcrypt.compareSync(inputPassword, user.password) // bcryptの一致しているか確認する関数
}


// users.js の以下の処理を実行する前に走る処理
// const user = new User({username, email, password})@users.js
UserSchema.pre('save', function(next) {
  const user = this   // 上述しているUserSchemaがthisに入ってくる
  const saltRounds = 10;  // 1secに何個記号化できるかという設定値
  // ここからbcryptのお作法
  // 詳細はhttps://www.npmjs.com/package/bcryptにある
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
        // Store hash in your password DB.
        user.password = hash // hash化後のパスワード
        next()
    });
  });
// ここまでbcryptのお作法
})


module.exports = mongoose.model('Users', UserSchema)