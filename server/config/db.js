const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        // to avoid errors switch off strictQuery
        mongoose.set('strictQuery', false)
        const conn = await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING)
        console.log(`Database connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB