const User = require("../modules/User");
class UserController {
  static users = [];
  static async signUp(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let result = await User.validate(username, email);
    if (result == 0) {
      res.json({ result: "username already exists" });
    } else if (result == 1) {
      res.json({ result: "email already exists" });
    } else if (result == 2) {
      let result = await User.signUp(username, password, email);
      if (result) {
        res.json({ result: "successfully" });
      } else {
        res.json({ result: "create account failed" });
      }
    } else {
      res.json({ result: "server not working" });
    }
  }

  static async login(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let result = await User.login(username, password);
    if (result == 0) {
      res.json({ result: "failed", message: "password incorrect" });
    } else if (result == 1) {
      res.json({
        result: "failed",
        message: "password and username incorrect",
      });
    } else if (result == "error") {
      res.json({ result: "failed", message: "server not working" });
    } else {
      res.json({ result: "successfully", email: result.email, id: result.id });
    }
  }

  static async  addUser(user) {
    UserController.users.push(user);
  }
  static async removeUser(id) {
    UserController.users = UserController.users.filter((item) => {
      return item.socketId != id;
    });
  }
  static  getUsersOnline(){
    return UserController.users
  }
  static async getUsers(req,res){
    let  result = await User.getUsers();
    if(result != 'error'){
      res.json({users:result});
    }else{
      res.json({error:result,users:[]});
    }
  }
}

module.exports = UserController;
