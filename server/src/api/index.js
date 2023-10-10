import { Router } from 'express';
import * as itemsController from './controllers/items.js';
import * as listsController from './controllers/lists.js';
import * as listItemsController from './controllers/listItems.js';
import * as unitsController from './controllers/units.js';

const router = Router();

const itemRouter = Router();
const listRouter = Router();
const listItemRouter = Router({ mergeParams: true });
const unitRouter = Router();

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
itemRouter.get('/items/:id', itemsController.getItem);
itemRouter.post('/items', itemsController.addItem);
itemRouter.put('/items/:id', itemsController.updateItem);

listRouter.get('/lists/:listId', listsController.getList);
listRouter.get('/lists\\(:name\\)', listsController.getListByName);
listRouter.get('/lists', listsController.getAllLists);
listRouter.post('/lists', listsController.addList);

listItemRouter.get('/', listItemsController.getAllListItems);
listItemRouter.get('/:id', listItemsController.getListItem);
listItemRouter.post('/', listItemsController.addListItem);

unitRouter.get('/units', unitsController.getAll);
unitRouter.get('/units/:id', unitsController.getUnit);
unitRouter.post('/units', unitsController.addUnit);
unitRouter.put('/units/:id', unitsController.updateUnit);

router.use(itemRouter);
router.use(listRouter);
router.use(unitRouter);
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
