import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});

export default mongoose.model('Item', itemSchema);
