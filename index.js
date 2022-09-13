const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const mainRoutes = require('./routes/main');
const creatorRoutes = require('./routes/creator');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(mainRoutes);
app.use('/api', creatorRoutes);
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`synthetic-scripting: listening on port ${port}`);
});
