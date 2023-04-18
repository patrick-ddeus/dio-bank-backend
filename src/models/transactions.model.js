import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['deposit', 'withdraw', 'transference'],
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

export default TransactionSchema;
