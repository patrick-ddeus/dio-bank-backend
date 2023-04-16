import Bank from '../models/bank-account.model.js';

const findService = (objectQuery = {}) => Bank.findOne(objectQuery).exec();
const createService = (objectQuery) => Bank.create(objectQuery);
const updateBalanceService = (filter, objectQuery) => Bank.updateOne(filter, objectQuery);

export default {
    findService,
    createService,
    updateBalanceService
};
