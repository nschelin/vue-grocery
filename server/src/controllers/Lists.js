const lists = [
	{
		_id: 1,
		products: [
			{
				count: 2,
				product: { 
					_id: 1,
					name: 'Apple', 
					price: 1.0, 
					unit: 'pound' 
				}
			},
			{
				count: 3,
				product: { 
					_id: 2,
					name: 'Orange', 
					price: 1.0, 
					unit: 'pound' 
				}
			}
		],
		modified: '2017-10-12T06:32:25.557Z',
		created: '2017-10-12T06:32:25.557Z'
	},
	{
		_id: 2,
		products: [
			{
				count: 2,
				product: { 
					_id: 1,
					name: 'Apple', 
					price: 1.0, 
					unit: 'pound' 
				}
			},
			{
				count: 2,
				product: { 
					_id: 3,
					name: 'Grapes', 
					price: 2.0, 
					unit: 'pound' 
				}
			}
		],
		modified: '2017-10-12T06:32:25.557Z',
		created: '2017-10-12T06:32:25.557Z'
	}
];

// const path = require('path');
// const appPath = path.parse(process.mainModule.filename).dir;
// const Datastore = require('nedb');
// const db = new Datastore({ filename: path.join(appPath, 'lists.db'), autoload: true });

module.exports.Lists = class {
	static list(req, res) {
		res.send({ lists: lists });
	}

	static get(req, res) {
		let id = +req.params.id;
		let list = lists.find(x => x._id === id);
		res.send({ list: list });
	}	

	static post(req, res) {
		let list = req.body;
		list._id = lists.length + 1;
		lists.push(list);
		res.send({ list: list });
	}

	static delete(req, res) {
		console.log('delete');
		let id = req.params.id;
		let index = lists.find(x => x._id === id);
		lists.splice(index, 1);
		res.send({ removed: 1 });
		// db.remove({ _id: id }, (err, numRemoved) => {
		// 	if(err) res.send({ err: err });

		// 	res.send({ removed: numRemoved });
		// });
	}
};