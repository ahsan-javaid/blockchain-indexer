import { Sequelize, Model, DataTypes } from 'sequelize';

export class Block extends Model {
  declare id: number;
  declare chain: string;
  declare network: string;
  declare parentHash: string | null;
  declare hash: string | null;
  declare nonce: string | null;
  declare timestamp: Date | null;
}

export const init = (sequelize: Sequelize) => {
  Block.init(
    {
      id: { // Actually its block height
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
      },
      chain: {
        type: new DataTypes.STRING(25),
        allowNull: false,
      },
      network: {
        type: new DataTypes.STRING(25),
        allowNull: false,
      },
      parentHash: {
        type: new DataTypes.STRING(128), // Actual 66 
        allowNull: true,
      },
      hash: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      nonce: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'blocks',
      sequelize,
      timestamps: true,
      // passing the `sequelize` instance is required
    },
  );
}