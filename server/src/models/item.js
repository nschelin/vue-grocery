import { DataTypes } from 'sequelize';
import { db } from '../db/index.js';

const Item = db.define(
	'item',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		paranoid: true,
		timestamps: true,
		createdAt: 'created',
		updatedAt: 'modified',
		deletedAt: 'deleted',
		tableName: 'Item',
	}
);

export { Item };
