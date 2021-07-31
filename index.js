const express = require('express')

const app = express();

const { randomBytes } = require('crypto');

app.use(express.json());

const comments = {}

app.get('/posts/:id/comments', (req, res) => {
    const comment = comments[req.params.id] || [];
    res.status(200).send(comment);
});


app.post('/posts/:id/comments' , (req,res) => {
    const {content} = req.body;
    const commentID = randomBytes(4).toString('hex');
    const comment = comments[req.params.id] || [];
    comment.push({id:commentID , content});
    comments[req.params.id] = comment

    res.status(201).send(comments[req.params.id]);
});

app.listen(5000 , () => console.log('listening on 5000'));