const db = require('../baseDb');
const dinnersDb = db.dinners;

class DinnerRepo {
	constructor() {}

	async list(page = 1, pageSize = 5) {
		if (page < 1) page = 0;

		const total = await this.total();

		return await new Promise((resolve, reject) => {
			dinnersDb
				.find({})
				.sort({ name: 1 })
				.skip((page - 1) * pageSize)
				.limit(pageSize)
				.exec((err, dinners) => {
					if (err) reject(err);

					const foundDinners = {
						dinners,
						total,
						page
					};

					resolve(foundDinners);
				});
		});
	}

	async insert(dinner) {
		return await dinnersDb.insertAsync(dinner);
	}
}

module.exports = { DinnerRepo };
