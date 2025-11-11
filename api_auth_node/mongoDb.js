import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado ao MongoDB Atlas!');
  } catch (erro) {
    console.error('Erro ao conectar ao MongoDB:', erro);
    process.exit(1);
  }
}