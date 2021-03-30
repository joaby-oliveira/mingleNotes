const express = require('express');
const utils = require('./utils');
const app = express();

const router = express.Router();

const UserController = require("./controllers/UserController");
const TableController = require('./controllers/TableController');

router.get('/', (req, res) => {
    console.log(utils.isEmpty(''));
    res.send('eaeee');
});

router.post("/user", UserController.create);
router.get("/users", UserController.findAll);
router.delete("/user/:id", UserController.delete);


router.post("/table", TableController.create);
router.get('/table', TableController.getAll);
router.get('/table/:id', TableController.getSingle);
router.delete('/table/:id', TableController.delete);
router.put('/table/:id', TableController.update);
module.exports = router;