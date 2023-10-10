import { DataTypes } from 'sequelize';
import { db } from '../db/index.js';
import { List } from './list.js';

const ListItem = db.define(
	'listItem',
	{
		listId: {
			type: DataTypes.INTEGER,
			references: {
				model: List,
				key: 'id',
			},
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price: {
			type: DataTypes.DECIMAL(10, 2),
			defaultValue: 0.0,
		},
		unit: {
			type: DataTypes.STRING,
			defaultValue: 'item',
		},
	},
	{
		paranoid: true,
		timestamps: true,
		createdAt: 'created',
		updatedAt: 'modified',
		deletedAt: 'deleted',
		tableName: 'ListItem',
	}
);

ListItem.belongsTo(List);

export { ListItem };
