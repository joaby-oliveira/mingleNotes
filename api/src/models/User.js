const database = require("../database/database");

class User{
    async create(data){
        try{
            await database.insert(data).table("users");
            return {status: true, msg: 'Usuário inserido'}
        }catch(err){
            return {status: false, msg: 'Usuário não pode ser inserido'}
        }
    }

    async findAll(){
        try{
            let users = await database.select().table("users");
            return {status: true, users}
        }catch(err){
            return {status: false, msg: err}
        }
    }

    async findOneByEmail(email){
        try{
            let user = await database.select().table("users").where({email: email});
            return {status: true, user}
        }catch(err){
            return {status: false, msg: err}
        }
    }

    async delete(id){
        try{
            var userExists = await database.select().table("users").where({id:id});
            if(userExists[0]){
                await database.delete().where({id: id}).table("users");
                return {status: true, userDoesNotExists: false, msg: "Usuário deletado com sucesso"}
            }else{
                return {status: false, userDoesNotExists: true, msg: "Usuário não encontrado"}
            }

            
        }catch(err){
            return {status: false, msg: "Não foi possível deletar o usuário"}
        }
    }

    async validateId (id) {
        try{
            const idExists = await database.select().from('users').where('id', id);
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