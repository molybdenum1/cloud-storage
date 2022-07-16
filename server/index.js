const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const authRouter = require('./routes/auth.routes');
const cors = require('./middleware/cors.middleware');

const app = express();
const PORT = config.get('serverPort');

app.use(cors)
app.use(express.json());
app.use('/api/auth', authRouter);

const start = async () => {
    try {
        await mongoose.connect(config.get('dbURL'));

        app.listen(PORT, () => console.log("server running on the port ", PORT))
    } catch (error) {
        console.log(error)
    }
}

start();
