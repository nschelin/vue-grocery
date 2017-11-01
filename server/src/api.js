const { Products } = require('./controllers/Products');
const { Lists } = require('./controllers/Lists');

const router = require('express').Router();

router.get('/status', (req, res) => {
	res.send({ message: 'hello!'});
});

router.get('/products', Products.list);
router.get('/products/:id', Products.get);
router.post('/product', Products.post);
router.put('/products/:id', Products.put);
router.delete('/products/:id', Products.delete);

router.get('/lists', Lists.list);
router.get('/lists/:id', Lists.get);
router.post('/list', Lists.post);


module.exports = router;