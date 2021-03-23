const User = require("../models/User");
const bcrypt = require('bcryptjs');
const utils = require('../utils');

class UserController{
    async create(req, res){
        const {name, email, password, nickname, birthDate, gender} = req.body;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const data = {
            name,
            email,
            password: hash, 
            nickname, 
            birthDate, 
            gender
        }

        if(utils.isOnlyLetters(data.name) == false){
            res.statusCode = 406;
            res.json({status: false, msg: "Não é permitido caracteres especiais no campo nome"});
            return
        }

        if(utils.isDoubleSpaced(data.name) == true){
            res.statusCode = 406;
            res.json({status: false, msg: "Não pode ter mais de um espaço entre as palavras no campo nome"});
            return
        }

        const {status, msg} = await User.create(data);
        if(status){
            res.statusCode = 201;
            res.json({status, msg})
        }else{
            res.statusCode = 406;
            res.json({status, msg})
        }
        
    }
    async findAll(req, res){
        const {status, users, msg} = await User.findAll();
        if(status){
            res.statusCode = 200;
            res.json({status, users})
        }else{
            res.statusCode = 406;
            res.json({status, msg})
        }
    }

    async delete(req, res){
        const id = req.params.id;
        const {status, userDoesNotExists, msg} =  await User.delete(id);
        if(status){
            res.statusCode = 200;
            res.json({status, msg});
        }else if(userDoesNotExists){
            res.statusCode = 404;
            res.json({status, msg});
        }else{
            res.statusCode = 406;
            res.json({status, msg});
        }
    }
}

module.exports = new UserController();