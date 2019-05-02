// /*const items = [
// 	{
// 		id: 1,
// 		name: 'Apple',
// 		price: '1.00',
// 		unit: 'pound'
// 	},
// 	{
// 		id: 2,
// 		name: 'Orange',
// 		price: '1.00',
// 		unit: 'pound'
// 	},
// 	{
// 		id: 3,
// 		name: 'Grapes',
// 		price: '2.00',
// 		unit: 'pound'
// 	},
// ];*/

const { ProductRepo } = require('../../db');
const db = new ProductRepo();

exports.list = async (req, res) => {
	const page = req.query.page || 1;
	const pageSize = req.query.pageSize || 5;
	const clients = await db.list(+page, +pageSize);
	res.send(clients);
};

exports.add = async (req, res) => {
	const product = req.body;
	const foundProduct = await db.findByName(product.name);
	if (!foundProduct) {
		product.created = product.modified = new Date();
		const newProduct = await db.insert(product);
		res.send(newProduct);
	} else {
		res.status(400).send('Product Exists');
	}
};

exports.update = async (req, res) => {
	const id = req.params.id;
	const product = req.body;
	const date = new Date();
	// if for some reason there isn't a created property, add it.
	if (!product.created) product.created = date;
	product.modified = date;
	try {
		const updatedProduct = await db.update(id, product);
		res.send(updatedProduct);
	} catch (e) {
		res.status(500).send(e);
	}
};

exports.delete = async (req, res) => {
	const id = req.params.id;

	try {
		const numRemoved = await db.delete(id);
		console.log(numRemoved);
		res.send({ numRemoved });
	} catch (e) {
		res.status(500).send(e);
	}
};

// const path = require('path');
// const appPath = path.parse(process.mainModule.filename).dir;
// //console.log(path.join(appPath, 'gstore.db'));
// const Datastore = require('nedb');
// const db = new Datastore({ filename: path.join(appPath, 'products.db'), autoload: true });

// module.exports.Products = class {
// 	static list(req, res) {
// 		db.find({}, (err, items) =>{
// 			if (err) res.send({ err: err });
// 			console.log(items);
// 			res.send({
// 				items: items
// 			});
// 		});

// 	}

// 	static get(req, res) {
// 		let id = req.params.id; // conver to number
// 		db.findOne( { _id: id }, (err, item) => {
// 			if (err) res.send({ err: err });
// 			console.log(item);
// 			res.send({ item: item });
// 		});
// 	}

// 	static post(req, res) {
// 		let item = req.body;
// 		delete item._id;
// 		db.insert(item, (err, item) => {
// 			res.send({ item: item });
// 		});
// 	}

// 	static put(req, res) {
// 		let id = req.params.id;
// 		let _item = req.body;

// 		db.update({ _id: id },
// 			{ name: _item.name, price: _item.price, unit: _item.unit },
// 			{ returnUpdatedDocs: true, multi: false },
// 			(err, numAffected, affectedItem) => {
// 				if(err) res.send({ err: err });

// 				res.send({ item: affectedItem });
// 			});
// 		// if(index > -1) {
// 		// 	let item = items[index];
// 		// 	item.name = _item.name;
// 		// 	item.price = _item.price;
// 		// 	item.unit = _item.unit;
// 		// 	res.send({ item: item });

// 		// 	items[index] = item;
// 		// }
// 		// else
// 		// 	res.send({ err: 'error' });
// 	}

// 	static delete(req, res) {
// 		console.log('delete');
// 		let id = req.params.id;

// 		db.remove({ _id: id }, (err, numRemoved) => {
// 			if (err) res.send({ err: err });

// 			res.send({ removed: numRemoved });
// 		});
// 		// let index = items.findIndex(x => x.id === id);
// 		// if(index > -1) {
// 		// 	let item = items.splice(index, 1);
// 		// 	res.send({ item: item });
// 		// }
// 		// else
// 		// 	res.send({ err: 'error' });
// 	}
// };
