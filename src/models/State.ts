import { Sequelize, Model, DataTypes } from 'sequelize';

export class State extends Model {
  declare id: number;
  declare chain: string;
  declare network: string;
  declare initialSyncComplete: boolean;
  declare height: number | null;
}

export const initStateModel = (sequelize: Sequelize) => {
  State.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
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
        type: new DataTypes.INTEGER.UNSIGNED,
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