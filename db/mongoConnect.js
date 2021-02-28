const mongoose = require('mongoose');
const { config } = require("../config/secretData");
mongoose.connect(`mongodb+srv://${config.mongoUser}:${config.mongoPassword}@cluster0.1dcgs.mongodb.net/project2021`, { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("mongo connected!");
    // we're connected!
});

module.exports = db;