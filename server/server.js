const express = require('express')
const cors = require('cors')

const {getForumPosts, createForumPosts, addComment, deleteForumPosts} = require('./controller')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/api/forumPosts', getForumPosts)
app.get('/api/forumPosts/:id', deleteForumPosts)
app.get('/api/forumPosts', createForumPosts)
app.get('/api/forumPost/:id', addComment)

app.listen(4000, () => console.log('Running on 4000'))