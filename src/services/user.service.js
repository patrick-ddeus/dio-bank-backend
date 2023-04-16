import User from '../models/user.model.js';

const createUser = (objectQuery) => User.create(objectQuery);
const readUsers = (objectQuery = {}) => User.find(objectQuery)
const readOneUser = (id) => User.findById(id)

export default {
    createUser,
    readUsers,
    readOneUser
};
