import { Router } from 'express';
import * as itemsController from './controllers/items.js';
import * as listsController from './controllers/lists.js';
import * as listItemsController from './controllers/listItems.js';

const router = Router();

const itemRouter = Router();
const listRouter = Router();
const listItemRouter = Router({ mergeParams: true });
listRouter.use('/list/:listId/listItems', listItemRouter);
// const { Products } = require('./controllers/productsController');
// const { Lists } = require('./controllers/listsConstroller');

// const productsController = require('./controllers/productsController');
// const dinnersController = require('./controllers/dinnersController');
// const randomNameController = require('./controllers/randomNameController');

router.get('/', async (req, res) => {
	const message = 'hello, world';
	res.send({ message });
});

itemRouter.get('/items', itemsController.getAll);
itemRouter.get('/item/:id', itemsController.getItem);
itemRouter.post('/item', itemsController.addItem);
itemRouter.put('/item/:id', itemsController.updateItem);

listRouter.get('/list/:listId', listsController.getList);
listRouter.post('/list', listsController.addList);

listItemRouter.get('/', listItemsController.getAllListItems);
listItemRouter.get('/:id', listItemsController.getListItem);
listItemRouter.post('/', listItemsController.addListItem);

router.use(itemRouter);
router.use(listRouter);
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
