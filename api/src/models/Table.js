const database = require("../database/database");

class Table {
    async create(data) {
        try {
            await database.insert(data).table('tables');
            return { status: true, msg: 'Tabela inserida' }
        } catch (err) {
            return { status: false, msg: 'Tabela não pode ser inserida', err }
        }
    }

    async getAll(userId) {
        try {
            const data = await database.select('*').from('tables').where({ 'user_id': userId });
            if (data.length > 0) {
                return { status: true, code: 200, data };
            } else if (data.length == 0) {
                return {
                    status: false, code: 204, data: {
                        msg: 'Nenhuma tabela foi criada ainda'
                    }
                }
            };
        } catch (err) {
            return { status: false, msg: err };
        }
    }

    async getSingle(id) {
        try {
            const result = await database.select('*').from('tables').where({'id': id});
            if(result.length === 1) {
                return result;
            }
        } catch (err) {
            return { status: false, msg: err };
        }
    }

    async delete(id) {
        try {
            const result = await database.delete('*').from('tables').where({'id': id});
            if(result == 1) {
                return {status: true, msg: "Tabela excluida com sucesso"}
            } else {
                return {status: false, msg: "Tabela não existe."}
            }
        } catch (err) {
            return {status: false, msg: err};
        }
    }
    
    async idExists(id) {
        try {
            const result = await database.select().from('tables').where({ 'id': id });
            return result.length === 1;
        } catch (err) {
            return { status: false, msg: err };
        }
    }
    
}

module.exports = new Table();