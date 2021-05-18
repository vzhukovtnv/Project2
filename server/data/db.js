const mongoose = require('mongoose');

let dbUrl = process.env.MONGODB_URL.trim();
if( typeof dbUrl === 'undefined' || dbUrl === null ){
    throw "MONGODB_URL isn't defined";
}


mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db = mongoose.connection;
db.once('open', (_) =>
  console.log('MongoDB connected')
);
db.on('error', (err) => console.error('MongoDB connection error!', err));

mongoose.set('useFindAndModify', false);

