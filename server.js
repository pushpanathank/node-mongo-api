require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5005;

// process.env.DATABASE_URL
mongoose.connect('mongodb+srv://finwego_task:8YvZQZdRxMafnAKU@pushpanathank-ekvn4.mongodb.net/finwego', { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const userRouter = require('./routes/user');
app.use('/user', userRouter);

const trainRouter = require('./routes/train');
app.use('/train', trainRouter);

const seatsRouter = require('./routes/seats-availability');
app.use('/seats-availability', seatsRouter);

const listRouter = require('./routes/interlist');
app.use('/interlist', listRouter);

const ticketRouter = require('./routes/book-ticket');
app.use('/book-ticket', ticketRouter);


app.listen(port, () => console.log('server started'));