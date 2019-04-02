const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { newsModel } = require('./model');
const   MONGO_URL='mongodb://user:user1234@ds048368.mlab.com:48368/pocket-excerpt';

mongoose.connect(MONGO_URL, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${MONGO_URL}`));
