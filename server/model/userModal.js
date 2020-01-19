const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const uuidv1 = require("uuid/v1");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String},
  id: { type: String, default: uuidv1() },
  image:{ type: String},
  password:{ type: String},
  middleName: { type: String},
  permission: {
    chat: {
      C: { type: Boolean, default: true },
      R: { type: Boolean, default: true },
      U: { type: Boolean, default: true },
      D: { type: Boolean, default: true }
    },
    news: {
      C: { type: Boolean, default: true },
      R: { type: Boolean, default: true },
      U: { type: Boolean, default: true },
      D: { type: Boolean, default: true }
    },
    settings: {
      C: { type: Boolean, default: true },
      R: { type: Boolean, default: true },
      U: { type: Boolean, default: true },
      D: { type: Boolean, default: true }
    }
  },
  surName: { type: String},
  username: { type: String},
  accessToken: { type: String},
  refreshToken: { type: String},
//   accessTokenExpiredAt:{ type: Date, default: new Date(2020, 3, 20).getTime()},
//   refreshTokenExpiredAt: { type: Date, default: new Date(2020, 3, 20).getTime()}
  accessTokenExpiredAt:{ type: Number, default: new Date(2020, 3, 20).getTime()},
  refreshTokenExpiredAt: { type: Number, default: new Date(2020, 3, 20).getTime()}
}
);

userSchema.methods.setPassword = function(pass) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(pass, salt);

  this.password = hash;
};

userSchema.methods.setToken = function(token) {
  this.accessToken = token;
  this.refreshToken = uuidv1();
};

userSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model("User", userSchema);

module.exports = User;
