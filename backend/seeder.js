const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const Provider = require('./models/Provider');
const Appointment = require('./models/Appointment');
const User = require('./models/User');

dotenv.config();

const sampleProviders = [
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

const sampleAppointments = [];

const seedData = async () => {
  try {
    await connectDB();
    await Provider.deleteMany();
    await Appointment.deleteMany();
    await User.deleteMany();

    const providers = await Provider.insertMany(sampleProviders);
    sampleAppointments.push(
      {
        customerName: 'Alice Baker',
        customerEmail: 'alice.baker@example.com',
        customerPhone: '+1 555 707 8080',
        appointmentDate: new Date(new Date().setDate(new Date().getDate() + 2)),
        providerId: providers[0]._id,
        notes: 'Follow-up on medication schedule',
        status: 'confirmed',
      },
      {
        customerName: 'Brian Miller',
        customerEmail: 'brian.miller@example.com',
        customerPhone: '+1 555 909 1010',
        appointmentDate: new Date(new Date().setDate(new Date().getDate() + 4)),
        providerId: providers[1]._id,
        notes: 'Discuss project roadmap',
        status: 'pending',
      },
      {
        customerName: 'Emma Johnson',
        customerEmail: 'emma.johnson@example.com',
        customerPhone: '+1 555 111 2222',
        appointmentDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        providerId: providers[2]._id,
        notes: 'Math tutoring session',
        status: 'confirmed',
      }
    );
    await Appointment.insertMany(sampleAppointments);

    const getFirstName = (fullName) => {
      const cleaned = fullName.replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.|Miss)\s+/i, '');
      return cleaned.split(' ')[0]?.toLowerCase();
    };

    for (const provider of providers) {
      const username = getFirstName(provider.name);
      const passwordHash = await bcrypt.hash(username, 10);
      await User.create({
        name: provider.name,
        email: provider.email,
        username,
        password: passwordHash,
        role: 'admin',
        providerId: provider._id,
      });
    }

    const adminPassword = await bcrypt.hash('Admin@123', 10);
    await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      username: 'admin',
      password: adminPassword,
      role: 'admin',
    });

    console.log('Sample data seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Seeding error', error);
    process.exit(1);
  }
};

seedData();
