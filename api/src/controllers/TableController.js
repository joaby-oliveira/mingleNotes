const Table = require("../models/Table");
const User = require("../models/User");

class TableController {
    async create(req, res) {
        try {
            const { name, imgUrl } = req.body;
            const { userId } = req.params;

            const data = {};

            if (name != undefined) {
                data.name = name;
            } else {
                res.statusCode = 406;
                res.json({status: false, msg: 'Campo de nome não preenchido' });
            }
            if (imgUrl != undefined) {
                data.imgUrl = imgUrl;
            } else {
                res.statusCode = 406;
                res.json({status: false, msg: 'Preencha o campo referência corretamente' });
            }
            if (userId != undefined) {
                data.user_id = userId;
            } else {
                res.statusCode = 406;
                res.json({status: false, msg: 'É necessário informar o id do usuário a quem pertence essa tabela' });
            }

            const userIdExists = await User.validateId(userId);
            console.log(userIdExists);
            if (userIdExists != []) {
                const { status, msg } = await Table.create(data);
                if (status) {
                    res.statusCode = 200;
                    res.json({ status: true, msg });
                } else {
                    res.statusCode = 406;
                    res.json({ status: false, msg: 'a' })
                }
            } else {
                res.statusCode = 406;
                res.json({ status: false, msg: 'Id de usuário informado não existe' })
            }
        } catch (err) {
            res.statusCode = 406;
            res.json({ status: false, msg: 'Algum erro aconteceu'})
        }
    }
}

module.exports = new TableController();