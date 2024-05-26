require('dotenv').config();
const mongoose = require('mongoose');

class MongooseConnection {
    static instance = null;

    constructor() {
        if (!MongooseConnection.instance) {
            this.connect();
            MongooseConnection.instance = this;
        }
        return MongooseConnection.instance;
    }

    async connect() {
        if (!mongoose.connection.readyState) {
            await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        }
    }

    getConnection() {
        return mongoose.connection;
    }
}

const mongooseConnectionInstance = new MongooseConnection();
module.exports = mongooseConnectionInstance;