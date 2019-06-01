/*
    {
        name: String,
        created: Date,
        modified: Date,
        products: [Product],
    }
*/

const { DinnerRepo } = require('../../db');
const db = new DinnerRepo();

exports.list = async (req, res) => {
	const page = req.query.page || 1;
	const pageSize = req.query.pageSize || 5;
	const dinnersInfo = await db.list(+page, +pageSize);
	res.send(dinnersInfo);
};

exports.get = async (req, res) => {};

exports.add = async (req, res) => {
	const dinner = req.body;
	// TODO: check for existing dinner

	dinner.created = dinner.modified = new Date();
	const newDinner = await db.insert(dinner);
	res.send(newDinner);
};

exports.update = async (req, res) => {};

exports.delete = async (req, res) => {};
