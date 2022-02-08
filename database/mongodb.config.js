const mongoose = require('mongoose');

const mongoDbUrl = process.env.MONGO_DB;

const dbConnection = async () => {
  try {
    await mongoose.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log('MONGO-DB LOCAL');
  }
  catch (error) {
    console.log(error);
    throw new Error('DB connection error!');
  }
}

module.exports = {
  dbConnection
}