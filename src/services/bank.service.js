import Bank from '../models/bank-account.model.js';

const findAllService = (objectQuery = {}) => Bank.find(objectQuery);
const createService = (objectQuery) => Bank.create(objectQuery);

export default {
    findAllService,
    createService
};
