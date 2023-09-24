const db = require('../db');
class User {

    

    static async signUp(username, password, email){
        return new Promise(resolve=>{
            db.query("insert into consumers (username,password,email) values (?,?,?)",[username, password, email],(err,result)=>{
                if(!err){
                    resolve(true);
                }else{
                    resolve(false)
                }
            })
        })
    }


    static async login(username, password){
        return new Promise(resolve=>{
            db.query("select * from consumers where username = ? ",[username],(err,result)=>{
                if(!err){
                    if(result.length >0){
                        if(password == result[0].password){
                            resolve({email:result[0].email,id:result[0].id});
                        }else{
                            resolve(0);
                        }
                    }else{
                        resolve(1)
                    }
                }else{
                    resolve('error');
                }
            })
        })
    
    }
    static async validate(username,email){
        return new Promise(resolve=>{
            db.query('select * from consumers where email = ? or username = ? ',[email,username],(err,result)=>{
                if(!err){
                    if(result.length >0 ){
                        if(username == result[0].username){
                            resolve(0)
                        }else if(email == result[0].email){
                            resolve(1)
                        }
                    }else{
                        resolve(2)
                    }
                }else{
                    resolve('error')
                }
                
            })
        })
    }

    static async getUsers(){
        return new Promise(resolve=>{
            db.query("select * from consumers",[],(err,result)=>{
                if(!err){
                    resolve(result);
                }else{
                    resolve('error');
                }
            })
        })
    }
}


module.exports = User;