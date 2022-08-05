const express = require('express')
const cors = require('cors')

const {getForumPosts, createForumPosts, addComment, deleteForumPosts} = require('./controller')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/api/forumPost', getForumPosts)
app.delete('/api/forumPost/:id', deleteForumPosts)
app.post('/api/forumPost', createForumPosts)
app.put('/api/forumPost/:id', addComment)

app.listen(4000, () => console.log('Running on 4000'))