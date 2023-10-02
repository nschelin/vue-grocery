import { Sequelize } from 'sequelize';

const db = new Sequelize({
	dialect: 'sqlite',
	storage: `${process.env.DB_FILEPATH}`,
});

export { db };
