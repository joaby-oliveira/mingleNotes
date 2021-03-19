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
                res.json({ status: false, msg: 'Campo de nome não preenchido' });
            }
            if (imgUrl != undefined) {
                data.imgUrl = imgUrl;
            } else {
                res.statusCode = 406;
                res.json({ status: false, msg: 'Preencha o campo referência corretamente' });
            }
            if (userId != undefined) {
                data.user_id = userId;
            } else {
                res.statusCode = 406;
                res.json({ status: false, msg: 'É necessário informar o id do usuário a quem pertence essa tabela' });
            }

            const userIdExists = await User.validateId(userId);
            console.log(userIdExists);
            if (userIdExists != []) {
                const { status, msg } = await Table.create(data);
                if (status) {
                    res.statusCode = 200;
                    res.json({ status: true, msg });
                } else {
                    res.statusCode = 201;
                    res.json({ status: false, msg: 'a' })
                }
            } else {
                res.statusCode = 404;
                res.json({ status: false, msg: 'Id de usuário informado não existe' })
            }
        } catch (err) {
            res.statusCode = 406;
            res.json({ status: false, msg: 'Algum erro aconteceu' })
        }
    }

    async getAll(req, res) {
        try {
            const { userId } = req.body;
            if (userId != undefined) {
                const userIdExists = await User.validateId(userId);

                if (userIdExists) {
                    const { status, code, data } = await Table.getAll(userId);
                    console.log(data);
                    if (status) {
                        res.statusCode = code;
                        res.json(data);
                    } else {
                        res.json(data);
                    }
                } else {
                    res.statusCode = 404;
                    res.json({ msg: "Id de usuário informado não existe" });
                }
            } else {
                res.statusCode = 400;
                res.json({ msg: "Id de usuário não informado" });
            }
        } catch (err) {
            res.statusCode = 400;
            res.json({ msg: err });
        }
    }

}

module.exports = new TableController();