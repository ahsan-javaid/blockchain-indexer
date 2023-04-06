import { Sequelize, Model, DataTypes } from 'sequelize';

export class State extends Model {
  declare chainid: number;
  declare chain: string;
  declare network: string;
  declare initialSyncComplete: boolean;
  declare height: number | null;
}

export const initStateModel = (sequelize: Sequelize) => {
  State.init(
    {
      chainid: {
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
      initialSyncComplete: {
        type: new DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      height: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      tableName: 'states',
      sequelize,
      timestamps: true,
      // passing the `sequelize` instance is required
    },
  );
}