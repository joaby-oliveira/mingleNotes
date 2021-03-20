const User = require("../models/User");
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

    async delete(req, res){
        const id = req.params.id;
        const {status, userDoesNotExists, msg} =  await user.delete(id);
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