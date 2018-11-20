const mongoose = require('mongoose');

module.exports.connect = (uri) => {
    mongoose.connect(uri);
    mongoose.Promise = global.Promise;

    mongoose.connection.on('error', (err) =>{
        console.log(`Mongoose connection error: ${err}`);
        process.exit(1);
    });

    require('./User');
    require('./CropConstants');
    require('./Equipment');
};