import { Sequelize, Model, DataTypes } from 'sequelize';

export class Transaction extends Model {
  declare hash: string;
  declare blockHash: string | null;
  declare transactionIndex: number | null;
  declare blockNumber: number | null;
  declare confirmations: number | null;
  declare from: string | null;
  declare to: string | null;
  declare gasPrice: number | null; // big number
  declare gasLimit: number | null; // big number
  declare value: number | null; // big number
  /*
    Todo:
      - Store s, r, v and data fields 
      - data field contains contract related activities and messages
  */
  declare nonce: number | null;
  declare chain: string;
  declare network: string;
  declare timestamp: Date | null;
}

export const initTxModel = (sequelize: Sequelize) => {
  Transaction.init(
    {
      hash: {
        type: new DataTypes.STRING(100), // Actual 66 len
        primaryKey: true,
      },
      blockHash: {
        type: new DataTypes.STRING(100), // Actual 66 len
        allowNull: true,
      },
      transactionIndex: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      blockNumber: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      confirmations: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      from: { // Todo: Should have an index for quick reterival
        type: new DataTypes.STRING(70), // Actual 42 len
        allowNull: false,
      },
      to: { // Todo: Should have an index for quick reterival
        type: new DataTypes.STRING(70), // Actual 42 len
        allowNull: false,
      },
      gasPrice: {
        type: new DataTypes.BIGINT,
        allowNull: true,
      },
      gasLimit: {
        type: new DataTypes.BIGINT,
        allowNull: true,
      },
      value: {
        type: new DataTypes.BIGINT,
        allowNull: true,
      },
      chain: {
        type: new DataTypes.STRING(25),
        allowNull: false,
      },
      network: {
        type: new DataTypes.STRING(25),
        allowNull: false,
      },
      nonce: {
        type: new DataTypes.NUMBER,
        allowNull: true,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'transactions',
      sequelize,
      timestamps: true,
      // passing the `sequelize` instance is required
    },
  );
}