const db = require('../baseDb');
const productsDb = db.products;

class ProductRepo {
	constructor() {}

	async list(page = 1, pageSize = 5) {
		if (page < 1) page = 0;

		const total = await this.total();

		return await new Promise((resolve, reject) => {
			productsDb
				.find({})
				.sort({ name: 1 })
				.skip((page - 1) * pageSize)
				.limit(pageSize)
				.exec((err, products) => {
					if (err) reject(err);

					const foundProducts = {
						products,
						total,
						page
					};

					resolve(foundProducts);
				});
		});
	}

	async total() {
		return await new Promise((resolve, reject) => {
			productsDb.count({}, (err, count) => {
				if (err) reject(err);
				resolve(count);
			});
		});
	}

	async insert(product) {
		return await productsDb.insertAsync(product);
	}
}

module.exports = { ProductRepo };
