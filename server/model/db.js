const userModal = require("./userModal");
const newsModal = require("./newsModal");

module.exports.addUser = ({
  firstName,
  middleName,
  surName,
  username,
  password
}) => {
  return new Promise((res, rej) => {
    const user = new userModal({ firstName, middleName, surName, username });
    user.setPassword(password);
    res(user.save());
  });
};

module.exports.getUserToken = function(accessToken) {
  return userModal.findOne(accessToken);
};

module.exports.getUserByName = function(username) {
  return userModal.findOne({username});
};

module.exports.getUserByID = function(id) {
  return userModal.findOne(id);
};

module.exports.getUsers = function() {
  return userModal.find();
};

module.exports.updateArticle = async function(data) {
    const article = newsModal.findOneAndUpdate({ id: data.id }, data, {
      new: true
    });
    return article;
};

module.exports.updateUser = async function(data) {
    const user = await userModal.findOneAndUpdate({ id: data.id }, data, {
      new: true
    });
  
    return user;
};


module.exports.addArticle = function(data) {
    const article = new newsModal(data);;
    return article.save();
}

module.exports.deleteArticle = function(id) {
    return newsModal.findOneAndDelete({id});
}

module.exports.getNews = function() {
    return newsModal.find();
}

module.exports.deleteUser = function(id){
    return userModal.findOneAndDelete({id})
}