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

    async getAll(id) {
        try {
            const data = await database.select('*').from('tables').where({'user_id': id});
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
            return { status: false, data: err };
        }
    }

}

module.exports = new Table();