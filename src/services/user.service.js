import User from '../models/user.model.js';

const readUsers = (objectQuery = {}) => User.find(objectQuery)
const readOneUser = (id) => User.findById(id)

export default {
    readUsers,
    readOneUser
};
