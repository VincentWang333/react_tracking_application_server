require('./modules/User');
require('./modules/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');
const trackRoutes = require('./routes/trackRoutes');


const app = express();

const mongoURI = 'mongodb+srv://admin:00000000@cluster0-vawhm.azure.mongodb.net/test?retryWrites=true&w=majority'

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);


mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
    console.error('Error connection to mongo', err);
});

app.get('/', requireAuth, (req, res) => {
    console.log(req);
    res.send(`Your email: ${req.user.email}`);
});


app.listen(3000, () => {
    console.log('listening on post 3000')
});