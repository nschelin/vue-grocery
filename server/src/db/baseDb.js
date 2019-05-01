const collections = ['products'];
const DataStore = require('nedb');

DataStore.prototype.insertAsync = async function(doc) {
	return await new Promise((resolve, reject) => {
		this.insert(doc, (err, newDoc) => {
			if (err) reject(err);
			resolve(newDoc);
		});
	});
};

const db = {};
collections.forEach(collection => {
	db[collection] = new DataStore({
		filename: `${__dirname}/data/${collection}.db`,
		autoload: true
	});
});

module.exports = db;
