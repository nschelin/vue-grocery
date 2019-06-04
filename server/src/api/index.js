// const { Products } = require('./controllers/productsController');
// const { Lists } = require('./controllers/listsConstroller');

const productsController = require('./controllers/productsController');
const dinnersController = require('./controllers/dinnersController');

const router = require('express').Router();

router.get('/', (req, res) => {
	res.send({ message: 'hello from api!' });
});

router.get('/products', productsController.list);
router.get('/product/:id', productsController.get);
router.post('/product', productsController.add);
router.put('/product/:id', productsController.update);
router.delete('/product/:id', productsController.delete);

router.get('/dinners', dinnersController.list);
//router.get('/dinner/:id', dinnersController.get);
router.post('/dinner', dinnersController.add);
//router.put('/dinner/:id', dinnersController.update);
//router.delete('/dinner/:id', dinnersController.delete);

module.exports = router;
