const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const connectDB = require('../src/db/db');

let mongoServer;

module.exports = {
  async setup() {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    process.env.JWT_SECRET = "test_jwt_secret";

    await connectDB(uri);

  },
  async teardown() {
    await mongoose.disconnect();
    if (mongoServer) await mongoServer.stop();
  },
  getUri() {
    return mongoServer ? mongoServer.getUri() : null;
  },
};
