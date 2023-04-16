import mongoose from 'mongoose';

const BankSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'User'
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
});

const Bank = mongoose.model('BankAccount', BankSchema);

export default Bank;
