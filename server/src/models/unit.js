import { DataTypes } from 'sequelize';
import { db } from '../db/index.js';

const Unit = db.define(
	'unit',
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
		tableName: 'Unit',
	}
);

export { Unit };
