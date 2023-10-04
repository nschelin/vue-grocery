import { Item } from '../../models/item.js';

async function add(name) {
	console.log(name);
	return await Item.create({ name });
}

async function get(id) {
	const item = await Item.findByPk(id, {
		attributes: { exclude: ['deleted'] },
	});

	if (!item) {
		throw new Error(`item id: ${id}`);
	}

	return item;
}

async function list() {
	return await Item.findAll();
}

async function update(id, name) {
	const item = await Item.findByPk(id, {
		attributes: { exclude: ['deleted'] },
	});

	if (item) {
		item.name = name;
		await item.save();
	} else {
		throw new Error(`item id: ${id}`);
	}

	return item;
}

async function addItem(req, res) {
	const { name } = req.body;
	try {
		const item = await add(name);
		res.status(200).json({ message: 'Item Added', item });
	} catch (e) {
		console.error(e);
		res.status(500).json({
			message: 'Internal Server Error',
		});
	}
}

async function getItem(req, res) {
	const { id } = req.params;
	try {
		const item = await get(id);
		res.status(200).json({ message: 'Item Retrieved', item });
	} catch (e) {
		console.error(e);
		res.status(500).json({
			message: 'Internal Server Error',
		});
	}
}

async function updateItem(req, res) {
	const { id } = req.params;
	const { name } = req.body;

	try {
		const item = await update(id, name);
		res.status(200).json({ message: 'Item Updated', item });
	} catch (e) {
		console.error(e);
		res.status(500).json({
			message: 'Internal Server Error',
		});
	}
}

async function getAll(req, res) {
	try {
		const items = await list();
		res.status(200).json({ message: 'Items Retrieved', items });
	} catch (e) {
		console.error(e);
		res.status(500).json({
			message: 'Internal Server Error',
		});
	}
}

export { addItem, getItem, getAll, updateItem };
