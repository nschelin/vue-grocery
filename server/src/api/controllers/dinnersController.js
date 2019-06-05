/*
    {
        name: String,
        created: Date,
        modified: Date,
        products: [Product],
        cost: Number
    }
*/

const { DinnerRepo } = require('../../db');
const db = new DinnerRepo();

// exports.list = async (req, res) => {
// 	const page = req.query.page || 1;
// 	const pageSize = req.query.pageSize || 5;
// 	const dinnersInfo = await db.list(+page, +pageSize);
// 	res.send(dinnersInfo);
// };

exports.list = async (req, res) => {
	const allDinners = await db.all();
	res.send(allDinners);
};

exports.get = async (req, res) => {
	const id = req.params.id;
	const foundDinner = await db.findById(id);
	if (foundDinner) res.send(foundDinner);
	else res.status(404).send();
};

exports.add = async (req, res) => {
	const dinner = req.body;
	// TODO: check for existing dinner

	dinner.created = dinner.modified = new Date();
	const newDinner = await db.insert(dinner);
	res.send(newDinner);
};

exports.update = async (req, res) => {
	const id = req.params.id;
	const dinner = req.body;
	const date = new Date();
	// if for some reason there isn't a created property, add it.
	if (!dinner.created) dinner.created = date;
	dinner.modified = date;
	try {
		const updatedDinner = await db.update(id, dinner);
		console.log('updatedDinner: ', updatedDinner);
		res.send(updatedDinner);
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
