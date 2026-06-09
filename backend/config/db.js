const mongoose = require('mongoose');
const Provider = require('../models/Provider');

const defaultProviders = [
  {
    name: 'Dr. Ayesha Khan',
    specialization: 'General Physician',
    email: 'ayesha.khan@example.com',
    phone: '+92 300 1234567',
  },
  {
    name: 'Mr. Ahmed Raza',
    specialization: 'Technology Consultant',
    email: 'ahmed.raza@example.com',
    phone: '+92 301 7654321',
  },
  {
    name: 'Ms. Nadia Ali',
    specialization: 'Academic Tutor',
    email: 'nadia.ali@example.com',
    phone: '+92 333 9876543',
  },
];

const seedDefaultProviders = async () => {
  const count = await Provider.countDocuments();
  if (count === 0) {
    await Provider.insertMany(defaultProviders);
    console.log('Default providers seeded');
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await seedDefaultProviders();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
