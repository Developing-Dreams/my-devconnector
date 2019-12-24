const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const gravatar=require('gravatar');
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex:true
        });
        console.log('Mongo db connected');
    }
    catch (err) {
        console.log(err.message);
        //Exit process with failed to connect db
        process.exit(1);
    }
}
module.exports = connectDB;