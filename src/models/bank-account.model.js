import mongoose from 'mongoose';
import TransactionSchema from './transactions.model.js';

const BankSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'User'
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    transactions: [TransactionSchema]
});

const Bank = mongoose.model('BankAccount', BankSchema);

export default Bank;
