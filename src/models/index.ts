import { Sequelize } from 'sequelize';
import fs from 'fs';

export const initModels = (sequelize: Sequelize) => {
  fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
  }).forEach(file => {
    const model = require(`./${file}`);
    model.init(sequelize); 
  });
} 