const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/endpoint');
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

mongoose.connect(process.env.MONGODBURL);
mongoose.connection.on('error', (err) => console.error(err));
mongoose.connection.once('open', () => console.log("Connect to MongoDB!"));


app.use('/', routes);

app.listen(process.env.PORT, () => console.log(`Server running on localhost: ${process.env.PORT}`));