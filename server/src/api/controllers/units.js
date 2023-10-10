import { Unit } from '../../models/unit.js';

async function add({ name }) {
	console.log(name);
	return await Unit.create({ name });
}

async function get(id) {
	const unit = await Unit.findByPk(id, {
		attributes: { exclude: ['deleted'] },
	});

	if (!unit) {
		throw new Error(`unit id: ${id}`);
	}

	return unit;
}

async function list() {
	return await Unit.findAll();
}

async function update(id, { name }) {
	const unit = await Unit.findByPk(id, {
		attributes: { exclude: ['deleted'] },
	});

	if (unit) {
		unit.name = name;
		await unit.save();
	} else {
		throw new Error(`unit id: ${id}`);
	}

	return unit;
}

async function addUnit(req, res) {
	const { name } = req.body;
	try {
		const unit = await add({ name });
		res.status(201).json({ message: 'Unit Added', unit });
	} catch (e) {
		console.error(e);
		res.status(500).json({
			message: 'Internal Server Error',
		});
	}
}

async function getUnit(req, res) {
	const { id } = req.params;
	try {
		const unit = await get(id);
		res.status(200).json({ message: 'Unit Retrieved', unit });
	} catch (e) {
		console.error(e);
		res.status(500).json({
			message: 'Internal Server Error',
		});
	}
}

async function updateUnit(req, res) {
	const { id } = req.params;
	const { name } = req.body;

	try {
		const unit = await update(id, { name });
		res.status(200).json({ message: 'Unit Updated', unit });
	} catch (e) {
		console.error(e);
		res.status(500).json({
			message: 'Internal Server Error',
		});
	}
}

async function getAll(req, res) {
	try {
		const units = await list();
		res.status(200).json({ message: 'Unit Retrieved', units });
	} catch (e) {
		console.error(e);
		res.status(500).json({
			message: 'Internal Server Error',
		});
	}
}

export { addUnit, getUnit, getAll, updateUnit };
