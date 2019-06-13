/*
	{
		name: random-fun-string,
		date: Date,
		created: Date,
		modified: Date,
		products:[Product],
		dinners:[Dinner],
		cost: Number
	}
*/

const { ListRepo } = require('../../db');
const db = new ListRepo();

exports.list = async (req, res) => {
	const allLists = await db.all();
	res.send(allLists);
};

exports.get = async (req, res) => {
	const id = req.params.id;
	const foundList = await db.findById(id);
	if (foundList) res.send(foundList);
	else res.status(404).send();
};

exports.add = async (req, res) => {
	const list = req.body;
	// TODO: check for existing list

	list.created = list.modified = new Date();
	const newList = await db.insert(list);
	res.send(newList);
};

exports.update = async (req, res) => {
	const id = req.params.id;
	const list = req.body;
	const date = new Date();
	// if for some reason there isn't a created property, add it.
	if (!list.created) list.created = date;
	list.modified = date;
	try {
		const updatedList = await db.update(id, list);
		console.log('updatedList: ', updatedList);
		res.send(updatedList);
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

// const lists = [
// 	{
// 		_id: 1,
// 		products: [
// 			{
// 				count: 2,
// 				product: {
// 					_id: 1,
// 					name: 'Apple',
// 					price: 1.0,
// 					unit: 'pound'
// 				}
// 			},
// 			{
// 				count: 3,
// 				product: {
// 					_id: 2,
// 					name: 'Orange',
// 					price: 1.0,
// 					unit: 'pound'
// 				}
// 			}
// 		],
// 		modified: '2017-10-12T06:32:25.557Z',
// 		created: '2017-10-12T06:32:25.557Z'
// 	},
// 	{
// 		_id: 2,
// 		products: [
// 			{
// 				count: 2,
// 				product: {
// 					_id: 1,
// 					name: 'Apple',
// 					price: 1.0,
// 					unit: 'pound'
// 				}
// 			},
// 			{
// 				count: 2,
// 				product: {
// 					_id: 3,
// 					name: 'Grapes',
// 					price: 2.0,
// 					unit: 'pound'
// 				}
// 			}
// 		],
// 		modified: '2017-10-13T06:32:25.557Z',
// 		created: '2017-10-13T06:32:25.557Z'
// 	},
// 	{
// 		_id: 3,
// 		products: [
// 			{
// 				count: 2,
// 				product: {
// 					_id: 1,
// 					name: 'Apple',
// 					price: 1.0,
// 					unit: 'pound'
// 				}
// 			},
// 			{
// 				count: 2,
// 				product: {
// 					_id: 3,
// 					name: 'Grapes',
// 					price: 2.0,
// 					unit: 'pound'
// 				}
// 			}
// 		],
// 		modified: '2017-10-14T06:32:25.557Z',
// 		created: '2017-10-14T06:32:25.557Z'
// 	},
// 	{
// 		_id: 4,
// 		products: [
// 			{
// 				count: 2,
// 				product: {
// 					_id: 1,
// 					name: 'Apple',
// 					price: 1.0,
// 					unit: 'pound'
// 				}
// 			},
// 			{
// 				count: 2,
// 				product: {
// 					_id: 3,
// 					name: 'Grapes',
// 					price: 2.0,
// 					unit: 'pound'
// 				}
// 			}
// 		],
// 		modified: '2017-10-15T06:32:25.557Z',
// 		created: '2017-10-15T06:32:25.557Z'
// 	},
// 	{
// 		_id: 6,
// 		products: [
// 			{
// 				count: 2,
// 				product: {
// 					_id: 1,
// 					name: 'Apple',
// 					price: 1.0,
// 					unit: 'pound'
// 				}
// 			},
// 			{
// 				count: 2,
// 				product: {
// 					_id: 3,
// 					name: 'Grapes',
// 					price: 2.0,
// 					unit: 'pound'
// 				}
// 			}
// 		],
// 		modified: '2017-10-16T06:32:25.557Z',
// 		created: '2017-10-16T06:32:25.557Z'
// 	},
// 	{
// 		_id: 2,
// 		products: [
// 			{
// 				count: 2,
// 				product: {
// 					_id: 1,
// 					name: 'Apple',
// 					price: 1.0,
// 					unit: 'pound'
// 				}
// 			},
// 			{
// 				count: 2,
// 				product: {
// 					_id: 3,
// 					name: 'Grapes',
// 					price: 2.0,
// 					unit: 'pound'
// 				}
// 			}
// 		],
// 		modified: '2017-10-17T06:32:25.557Z',
// 		created: '2017-10-17T06:32:25.557Z'
// 	}
// ];

// // const path = require('path');
// // const appPath = path.parse(process.mainModule.filename).dir;
// // const Datastore = require('nedb');
// // const db = new Datastore({ filename: path.join(appPath, 'lists.db'), autoload: true });

// module.exports.Lists = class {
// 	static list(req, res) {
// 		res.send({ lists: lists });
// 	}

// 	static get(req, res) {
// 		let id = +req.params.id;
// 		let list = lists.find(x => x._id === id);
// 		res.send({ list: list });
// 	}

// 	static post(req, res) {
// 		let list = req.body;
// 		list._id = lists.length + 1;
// 		lists.push(list);
// 		res.send({ list: list });
// 	}

// 	static delete(req, res) {
// 		console.log('delete');
// 		let id = req.params.id;
// 		let index = lists.find(x => x._id === id);
// 		lists.splice(index, 1);
// 		res.send({ removed: 1 });
// 		// db.remove({ _id: id }, (err, numRemoved) => {
// 		// 	if(err) res.send({ err: err });

// 		// 	res.send({ removed: numRemoved });
// 		// });
// 	}
// };
