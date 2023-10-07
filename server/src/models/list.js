import { DataTypes } from 'sequelize';
import { db } from '../db/index.js';

const List = db.define(
	'list',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		subTotal: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0.0,
		},
		taxRate: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0.0,
		},
		total: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0.0,
		},
	},
	{
		paranoid: true,
		timestamps: true,
		createdAt: 'created',
		updatedAt: 'modified',
		deletedAt: 'deleted',
		tableName: 'List',
	}
);

export { List };
