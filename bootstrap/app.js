import dotenv from 'dotenv';
import '../config/sequelize_relations.js';
import CONSTANTS from '../config/constants.js';

// Carregar variáveis de ambiente
dotenv.config();

// Tornar CONSTANTS global
global.CONSTANTS = CONSTANTS;