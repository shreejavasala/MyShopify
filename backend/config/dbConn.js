import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected is successfully at : ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connecting Database.. ${error}`);
  }
}

export default connectDB;