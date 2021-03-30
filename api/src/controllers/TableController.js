const Table = require("../models/Table");
const User = require("../models/User");

const utils = require("../utils");

const validateTable = {
    isValidName: (name) => {
        const validate =
            !utils.isEmpty(name) &&
            !utils.isDoubleSpaced(name) &&
            utils.isValidLength(name, 3)
        return validate;
    },
    isValidImgUrl: (imgUrl) => {
        const validate =
            !utils.isDoubleSpaced(imgUrl) &&
            utils.isValidLength(imgUrl, 10)
        return validate;
    },
    isValidUserId: (userId) => {
        const validate =
            !utils.isEmpty(userId) &&
            !utils.isDoubleSpaced(userId) &&
            utils.isOnlyNumber(userId)
        return validate;
    }
}
class TableController {
    async create(req, res) {
        try {
            const { name, imgUrl, userId } = req.body;
            const data = {};

            const validUserData =
                validateTable.isValidName(name) &&
                validateTable.isValidImgUrl(imgUrl) &&
                validateTable.isValidUserId(userId);

            if (validUserData) {
                data.name = name;
                data.imgUrl = imgUrl;
                data.user_id = userId;
            } else {
                res.statusCode = 400;
                res.json({ status: false, msg: 'Nome, id de usuário ou url da imagem errado(s)' });
            }

            const userIdExists = await User.validateId(userId);

            if (userIdExists != []) {
                const { status, msg } = await Table.create(data);
                console.log(msg);
                if (status) {
                    res.statusCode = 200;
                    res.json({ status: true, msg });
                } else {
                    res.statusCode = 500;
                    res.json({ status: false, msg: 'Erro no banco de dados' })
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

    async getSingle(req, res) {
        const { id } = req.params;

        if (id) {
            const idExists = await Table.idExists(id);
            if (idExists) {
                const result = await Table.getSingle(id);
                if (result.length > 0) {
                    res.statusCode = 200;
                    res.json({status: true, data: result})
                }else {
                    res.statusCode = 404;
                    res.json({status: false, msg: 'Tabela não encontrada'})
                }
            } else {
                res.statusCode = 400;
                res.json({status: false, msg: "Id informado não existe"})
            }
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            if(id){
                const {status, msg} = await Table.delete(id);
                if(status) {
                    res.statusCode = 200;
                    res.send({status, msg})
                } else {
                    res.statusCode = 400;
                    res.send({status, msg})
                }
            }else {
                res.send({status: false, msg: 'O id precisa ser informado'})
            }
        } catch(err) {
            res.send({status: false, msg: `erro ao deletar tabela:${err}`})
        }
    }
}

module.exports = new TableController();