const express = require('express');
const app = express();

const router = express.Router();

const UserController = require("./controllers/UserController");
const TableController = require('./controllers/TableController');

router.get('/', (req, res) => {
    res.send('eaeee');
});

router.post("/user", UserController.create);


router.post("/table/:userId", TableController.create);


module.exports = router;