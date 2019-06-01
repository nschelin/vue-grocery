const collections = ['products', 'dinners', 'lists'];
const DataStore = require('nedb');

DataStore.prototype.insertAsync = async function(doc) {
	return await new Promise((resolve, reject) => {
		this.insert(doc, (err, newDoc) => {
			if (err) reject(err);
			resolve(newDoc);
		});
	});
};

DataStore.prototype.updateAsync = async function(query, doc) {
	return await new Promise((resolve, reject) => {
		this.update(
			query,
			doc,
			{ multi: false, returnUpdatedDocs: true },
			(err, numAffected, updatedDoc) => {
				if (err) reject(err);
				resolve(updatedDoc);
			}
		);
	});
};

DataStore.prototype.removeAsync = async function(query) {
	return await new Promise((resolve, reject) => {
		this.remove(query, {}, (err, numRemoved) => {
			console.log(err, numRemoved);
			if (err) reject(err);
			resolve(numRemoved);
		});
	});
};

DataStore.prototype.findOneAsync = async function(query) {
	return await new Promise((resolve, reject) => {
		this.findOne(query, (err, doc) => {
			if (err) reject(err);
			resolve(doc);
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
