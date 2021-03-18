const database = require("../database/database");

class User{
    async create(data){
        try{
            await database.insert(data).table("users");
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = new User();