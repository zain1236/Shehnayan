import mongoose from "mongoose";
import config from "config";
const db = config.get('mongoURI');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(db);
        console.log("Mongoose Connected...")
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}
export default connectToDatabase;