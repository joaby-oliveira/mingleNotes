const User = require("../models/User");
const bcrypt = require('bcryptjs');
const utils = require('../utils');

const userValidation = {
    name: (data, res) => {
        if(data.name == undefined || utils.isEmpty(data.name) || !utils.isValidLength(data.name, 2)){
            res.statusCode = 406;
            res.json({status: false, msg: "O campo nome deve ter pelo menos 2 caracteres"});
            return
        }else if(!utils.isOnlyLetters(data.name)){
            res.statusCode = 406;
            res.json({status: false, msg: "Não é permitido números ou caracteres especiais no campo nome"});
            return
        }else if(utils.isDoubleSpaced(data.name)){
            res.statusCode = 406;
            res.json({status: false, msg: "Não pode ter mais de um espaço entre as palavras no campo nome"});
            return
        }
    },
    email: (data, res) => {
        if(data.email == undefined || utils.isEmpty(data.email) || !utils.isValidLength(data.email, 2)){
            res.statusCode = 406;
            res.json({status: false, msg: "O campo email deve ser preenchido"});
            return
        }else if(utils.isSpaced(data.email)){
            res.statusCode = 406;
            res.json({status: false, msg: "Não pode ter espaços no campo email"});
            return
        }else if(!utils.isValidEmail(data.email)){
            res.statusCode = 406;
            res.json({status: false, msg: "Digite um email válido"});
        }
    },
    password: (pass, res) => {
        if(!utils.isValidLength(pass, 8)){
            res.statusCode = 406;
            res.json({status: false, msg: "A senha deve ter pelo menos 8 caracteres"});
        }
    },
    nickname: (data, res) => {
        if(data.nickname == undefined || utils.isEmpty(data.nickname) || !utils.isValidLength(data.nickname, 3)){
            res.statusCode = 406;
            res.json({status: false, msg: "O campo apelido deve ter pelo menos 3 caracteres"});
            return
        }else if(utils.isSpaced(data.nickname)){
            res.statusCode = 406;
            res.json({status: false, msg: "Não pode ter espaços no campo apelido"});
            return
        }
    },
    birthDate: (data, res) =>{
        if(data.birthDate == undefined || utils.isEmpty(data.birthDate)){
            res.statusCode = 406;
            res.json({status: false, msg: "O campo data de nascimento deve ser preenchido"});
            return
        }else if(!utils.isOnlyLettersAndDashs(data.birthDate)){
            res.statusCode = 406;
            res.json({status: false, msg: "Insira uma data de nascimento válida"});
            return
        }
    },
    gender: (data, res) =>{
        if(data.gender == undefined || utils.isEmpty(data.gender)){
            res.statusCode = 406;
            res.json({status: false, msg: "O campo sexo deve ser preenchido"});
            return
        }else if(data.gender.length != 1){
            res.statusCode = 406;
            res.json({status: false, msg: "O campo sexo aceita só 1 caractere"});
            return
        }else if(!utils.isValidGender(data.gender)){
            res.statusCode = 406;
            res.json({status: false, msg: "Digite um sexo válido"});
            return
        }
    }
}

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

        userValidation.name(data, res);
        userValidation.email(data, res);
        userValidation.password(password, res);
        userValidation.nickname(data, res);
        userValidation.birthDate(data, res);
        userValidation.gender(data, res);


        const { status } = await User.findOneByEmail(data.email);
        if(!status){
            const { status, msg } = await User.create(data);
            if(status){
                res.statusCode = 201;
                res.json({status, msg})
            }else{
                res.statusCode = 406;
                res.json({status, msg})
            }
        }else{
            res.statusCode = 406;
            res.json({status: false, msg: "Este email já foi cadastrado"})
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