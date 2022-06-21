const router = require('express').Router();
const AttractionController = require('./controllers/AttractionController');

// Apenas para teste
router.get('/', (req, res) => {
    return res.status(200).send({ nameApp: "park-stack" });
});

router.post('/atracao', AttractionController.save);
router.get('/atracao/:id', AttractionController.findById);

module.exports = router;