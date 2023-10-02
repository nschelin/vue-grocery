import { Router } from 'express';
import * as itemsController from './controllers/items.js';

const router = Router();
// const { Products } = require('./controllers/productsController');
// const { Lists } = require('./controllers/listsConstroller');

// const productsController = require('./controllers/productsController');
// const dinnersController = require('./controllers/dinnersController');
// const randomNameController = require('./controllers/randomNameController');

router.get('/', async (req, res) => {
	const message = 'hello, world';
	res.send({ message });
});
router.get('/item/:id', itemsController.getItem);
router.post('/item', itemsController.addItem);
router.put('/item/:id', itemsController.updateItem);

// router.get('/random-name', randomNameController.get);

// router.get('/products', productsController.list);
// router.get('/product/:id', productsController.get);
// router.post('/product', productsController.add);
// router.put('/product/:id', productsController.update);
// router.delete('/product/:id', productsController.delete);

// router.get('/dinners', dinnersController.list);
// router.get('/dinner/:id', dinnersController.get);
// router.post('/dinner', dinnersController.add);
// router.put('/dinner/:id', dinnersController.update);
// router.delete('/dinner/:id', dinnersController.delete);

export { router as api };
