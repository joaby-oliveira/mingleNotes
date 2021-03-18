const database = require("../database/database");

class Table{
    async create(data){
        try{
            await database.insert(data).table("tables");
            return {status: true, msg: 'Tabela inserida'}
        }catch(err){
            return {status: false, msg: 'Tabela não pode ser inserida', err}
        }
    }

}

module.exports = new Table();