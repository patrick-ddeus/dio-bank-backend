import mongoose from 'mongoose';
import 'dotenv/config';

const connectDatabase = () => {
    mongoose
        .connect(process.env.DATABASE_URL)
        .then(() => console.log('Database sucessfully connected'))
        .catch((err) => console.error(err));
};

export default connectDatabase;
