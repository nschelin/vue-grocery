// const { Products } = require('./controllers/productsController');
// const { Lists } = require('./controllers/listsConstroller');

const productsController = require('./controllers/productsController');

const router = require('express').Router();

router.get('/', (req, res) => {
	res.send({ message: 'hello from api!' });
});

router.post('/product', productsController.add);

// router.get('/products', Products.list);
// router.get('/products/:id', Products.get);
// router.post('/product', Products.post);
// router.put('/products/:id', Products.put);
// router.delete('/products/:id', Products.delete);

// router.get('/lists', Lists.list);
// router.get('/lists/:id', Lists.get);
// router.post('/list', Lists.post);
// router.delete('/lists/:id', Lists.delete);

module.exports = router;
