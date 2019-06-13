const db = require('../baseDb');
const listsDb = db.lists;

class ListRepo {
	constructor() {}

	async list(page = 1, pageSize = 5) {
		if (page < 1) page = 0;

		const total = await this.total();

		return await new Promise((resolve, reject) => {
			listsDb
				.find({})
				.sort({ name: 1 })
				.skip((page - 1) * pageSize)
				.limit(pageSize)
				.exec((err, lists) => {
					if (err) reject(err);

					const foundLists = {
						lists,
						total,
						page
					};

					resolve(foundLists);
				});
		});
	}

	async all() {
		return await new Promise((resolve, reject) => {
			listsDb.find({}, (err, docs) => {
				if (err) reject(err);
				resolve(docs);
			});
		});
	}

	async insert(list) {
		return await listsDb.insertAsync(list);
	}

	async update(id, list) {
		return await listsDb.updateAsync({ _id: id }, list);
	}

	async delete(id) {
		return await listsDb.removeAsync({ _id: id });
	}

	async findById(id) {
		return await listsDb.findOneAsync({ _id: id });
	}

	async findByName(name) {
		return await listsDb.findOneAsync({ name });
	}
}

module.exports = { ListRepo };
