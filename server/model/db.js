const userModal = require("./userModal");
const newsModal = require("./newsModal");

module.exports.addUser = ({
  firstName,
  middleName,
  surName,
  username,
  password
}) => {
  // console.log(data)
  return new Promise((res, rej) => {
    const user = new userModal({ firstName, middleName, surName, username });
    // console.log('destructureuser', user)
    user.setPassword(password);
    res(user.save());
  });
};

// module.exports.addUser = ({username, password}) => {
//     // console.log(data)
//     return new Promise((res,rej) => {
//         // const user = new userModal({firstName, middleName, surName, username})
//         // console.log('destructureuser', user)
//         user.setPassword(password);
//         res(user.save())
//     })
// }

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
    const article = await newsModal.findOneAndUpdate({ id: data.id }, data);
    return article;
};

module.exports.updateUser = async function(data) {
    console.log(`updateUser` , data)
    const user = await userModal.findOneAndUpdate({ id: data.id }, data);
    // if (password && oldPassword && user.isValidPassword(oldPassword)) {
    //   user.setPassword('');
    //   await user.save();
    // }
  
    return user;
};


module.exports.addArticle = function(data) {
    const article = new newsModal(data);;
    return article.save();
}

module.exports.deleteArticle = function(id) {
    // const article = new newsModal(data);;
    // console.log(id)
    return newsModal.findOneAndDelete({id});
}

module.exports.getNews = function() {
    return newsModal.find();
}

module.exports.deleteUser = function(id){
    return userModal.findOneAndDelete({id})
}