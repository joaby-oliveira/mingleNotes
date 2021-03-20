const user = require("../models/User");

class UserController{
    async create(req, res){
        const {name, email, password, nickname, birthDate, gender} = req.body;
        const data = {
            name,
            email,
            password, 
            nickname, 
            birthDate, 
            gender
        }


        const {status, msg} = await user.create(data);
        if(status){
            res.statusCode = 200;
            res.json({status, msg})
        }else{
            res.statusCode = 406;
            res.json({status, msg})
        }
    }
    async findAll(req, res){
        const {status, users, msg} = await user.findAll();
        if(status){
            res.statusCode = 200;
            res.json({status, users})
        }else{
            res.statusCode = 406;
            res.json({status, msg})
        }
    }
}

module.exports = new UserController();