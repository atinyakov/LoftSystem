const userModal = require("./userModal");

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

module.exports.getUserByName = function(username) {
  return userModal.findOne({ username });
};

module.exports.updateUser = async function(data) {
    const user = await userModal.findOneAndUpdate({ id: data.id }, data);
    // if (password && oldPassword && user.isValidPassword(oldPassword)) {
      user.setPassword('');
    //   await user.save();
    // }
  
    return user;
};
