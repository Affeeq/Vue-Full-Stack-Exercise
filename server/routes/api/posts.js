const 	express = require('express'),
		mongoose = require('mongoose'),
		router = express.Router();

const postSchema = new mongoose.Schema({
	text: String,
	createdAt: Date
});

const Post = mongoose.model('Post', postSchema);

// GET POST
router.get('/', (req, res) => {
	Post.find({}, (error, posts) => {
		(error) ? console.log(error) : res.send(posts);
	});
});
// ADD POST
router.post('/', (req, res) => {
	Post.create({text: req.body.text, createdAt: new Date()}, (error, posts) => {
		(error) ? console.log(error) : res.status(201).send();
	})
});

// DELETE POST
router.delete('/:id', (req, res) => {
	Post.findByIdAndRemove(req.params.id, (error, post) => {
		(error) ? console.log(error) : res.status(200).send();
	})
});

// UPDATE POST

module.exports = router;