const router = require('express').Router();
const AttractionController = require('./controllers/AttractionController');

// Apenas para teste
router.get('/', (req, res) => {
    return res.status(200).send({ nameApp: "park-stack" });
});

router.post('/atracao', AttractionController.save);
router.get('/atracao/:id', AttractionController.findById);
router.get('/atracao', AttractionController.findAll);
router.post('/checkin', AttractionController.checkIn);
router.get('/atracao/usuario/:id', AttractionController.getUserPosition);
router.post('/checkout', AttractionController.checkOut);

module.exports = router;