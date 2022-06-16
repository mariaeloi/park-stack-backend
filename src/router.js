const router = require('express').Router();
const AtracaoController = require('./controllers/AtracaoController');

// Apenas para teste
router.get('/', (req, res) => {
    return res.status(200).send({ nameApp: "park-stack" });
});

router.post('/atracao', AtracaoController.save);
router.get('/atracao/:id', AtracaoController.findById);

module.exports = router;