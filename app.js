
const express = require('express');
const app = express();
const db = require('./db');

const indexRouter = require('./Routes/indexRouter');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.listen(5001, () => {
    console.log('Server running on http://localhost:5001');
});
