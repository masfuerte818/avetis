const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({ extended: true }));
app.use('/api/receive', require('./routes/receive.routes'));
app.use('/api/present', require('./routes/present.routes'));
app.use('/api', require('./routes/api'));


const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'avetis', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'avetis', 'build', 'index.html'))
    })
}

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