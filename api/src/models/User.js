const database = require("../database/database");

class User{
    async create(data){
        try{
            await database.insert(data).table("users");
        }catch(err){
            console.log(err);
        }
    }

    async validateId (id) {
        try{
            const idExists = await database.select().from('users').where('id', id);
            console.log(idExists);
            if (idExists[0]) {
                return {status: true};
            } else {
                return false;
            }
        }catch(err) {
            console.log(err);
        }
    } 

}

module.exports = new User();