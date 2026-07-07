import mongoose from 'mongoose'

let db;

try {
  db = await mongoose.connect(process.env.ATLAS_URI)
  console.log('Connected to MongoDB')
} catch (e) {
  console.error(e);
}


export default db;
