import { ListItem } from '../../models/listItem.js';
import { getAll } from './items.js';

async function get(id) {
	const listItem = await ListItem.findByPk(id, {
		attributes: { exclude: ['deleted'] },
	});

	if (!listItem) {
		throw new Error(`listItem id: ${id}`);
	}

	return listItem;
}

async function list() {
	return await ListItem.findAll();
}

async function add({ listId, name, price }) {
	console.log({ listId, name, price });

	return await ListItem.create({ listId, name, price });
}

async function getListItem(req, res) {
	const { listId, id } = req.params;

	try {
		const listItem = await get(id);
		res.status(200).json({ message: 'ListItem Retrieved', listItem });
	} catch (e) {
		console.error(e);
		res.status(500).json({
			message: 'Internal Server Error',
		});
	}
}

async function getAllListItems(req, res) {
	try {
		const listItems = await list();
		res.status(200).json({ message: 'ListItems Retrieved', listItems });
	} catch (e) {
		console.error(e);
		res.status(500).json({
			message: 'Internal Server Error',
		});
	}
}

async function addListItem(req, res) {
	const { listId, name, price } = req.body;
	try {
		const listItem = await add({ listId, name, price });
		res.status(201).json({ message: 'ListItem Added', listItem });
	} catch (e) {
		console.error(e);
		res.status(500).json({
			message: 'Internal Server Error',
		});
	}
}

export { addListItem, getListItem, getAllListItems };
