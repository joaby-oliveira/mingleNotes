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

        await user.create(data);
        res.statusCode = 200;
        res.json({msg: "Tudo OK!"})
    }
}

module.exports = new UserController();