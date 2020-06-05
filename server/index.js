const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// app config
mongoose.set('useUnifiedTopology', true);
var dbUrl = process.env.DATABASEURL || "mongodb://localhost:27017/vue_full_stack"
mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log(`Connected to ${dbUrl}`);
}).catch(err => {
	console.log("ERROR", err.message);
});


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
mongoose.set('useFindAndModify', false); // took out the deprecation warning when updating forms
app.use(cors());

// require routes
const posts = require('./routes/api/posts');

// routes config
app.use('/api/posts', posts);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started in port ${port}`));