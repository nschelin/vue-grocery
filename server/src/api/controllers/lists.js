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

async function getByName(name, includeItems) {
	const list = await List.findOne({
		where: {
			name,
		},
		attributes: { exclude: ['deleted'] },
	});

	if (list && includeItems) {
		await list.getListItems();
	}

	return list;
}

async function list() {
	return await List.findAll();
}

async function add({ name }) {
	console.log(name);
	return await List.create({ name });
}

async function update(id, { name }) {
	const list = await List.findByPk(id, {
		attributes: { exclude: ['deleted'] },
	});

	if (list) {
		list.name = name;
		await list.save();
	} else {
		throw new Error(`list id: ${id}`);
	}

	return list;
}

async function getList(req, res) {
	const { listId } = req.params;
	const { items } = req.query;
	const includeItems = items !== undefined; // * exists

	try {
		const list = await get(listId, includeItems);
		res.status(200).json({ message: 'List Retrieved', list });
	} catch (e) {
		console.error(e);
		res.status(500).json({
			message: 'Internal Server Error',
		});
	}
}

async function getAllLists(req, res) {
	try {
		const lists = await list();
		res.status(200).json({ message: 'Lists Retrieved', lists });
	} catch (e) {
		console.error(e);
		res.status(500).json({
			message: 'Internal Server Error',
		});
	}
}

async function getListByName(req, res) {
	const { name } = req.params;
	const { items } = req.query;
	const includeItems = items !== undefined; // * exists

	try {
		let message = 'List Retrieved';
		const list = await getByName(name, includeItems);
		if (!list) {
			message = 'No List';
		}

		res.status(200).json({ message, list });
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

async function updateList(req, res) {
	const { id } = req.params;
	const { name } = req.body;

	try {
		const list = await update(id, { name });
		res.status(200).json({ message: 'List Updated', list });
	} catch (e) {
		console.log(e);
		res.status(500).json({
			message: 'Internal Server Error',
		});
	}
}

export { addList, getList, getListByName, updateList, getAllLists };
