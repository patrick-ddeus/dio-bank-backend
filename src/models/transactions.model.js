import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'User'
    },
    type: {
        type: String,
        enum: ['deposit', 'withdraw'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Transactions = mongoose.model('BankAccount', TransactionSchema);

export default Transactions;
