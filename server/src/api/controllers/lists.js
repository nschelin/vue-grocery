import { List } from '../../models/list.js';

async function get(id, includeItems) {
	const list = await List.findByPk(id, {
		attributes: { exclude: ['deleted'] },
	});

	if (!list) {
		throw new Error(`list id: ${id}`);
	}

	if (includeItems) {
		await list.getListItems();
	}

	return list;
}

async function add({ name }) {
	console.log(name);
	return await List.create({ name });
}

async function getList(req, res) {
	const { id, includeItems } = req.params;
	try {
		const list = await get(id, includeItems);
		res.status(200).json({ message: 'List Retrieved', list });
	} catch (e) {
		console.error(e);
		res.status(500).json({
			message: 'Internal Server Error',
		});
	}
}

async function addList(req, res) {
	const { name } = req.body;
	try {
		const list = await add({ name });
		res.status(201).json({ message: 'List Added', list });
	} catch (e) {
		console.error(e);
		res.status(500).json({
			message: 'Internal Server Error',
		});
	}
}

export { addList, getList };
