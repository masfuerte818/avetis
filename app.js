const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }));
app.use('/api/receive', require('./routes/receive.routes'));
app.use('/api/present', require('./routes/present.routes'));

const PORT = config.get('port') || 3000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => {
            console.log('started on port: ' + PORT)
        });
    } catch (e) {
        console.log('Server error', e.message);
        process.exit(1);
    }
};
start();