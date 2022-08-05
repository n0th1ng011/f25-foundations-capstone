let forumPosts = [
    {
        id: 0,
        name: 'Trey',
        post: 'How do I harden Windows?',
        comments: [
            {
                id: 0,
                content: 'I would suggest starting with privacy settings in the control panel. If you want to go crazy with it, you can look into regedit, uninstalled cortana with it!'
            }
        ]
    },
    {
        id: 1,
        name: 'John',
        post: 'What is a good firewall to use in linux?',
        comments: [
            {
                id: 0,
                content: 'I use UFW, pretty solid and available in most distros. I heard Fail2Ban is pretty good too.'
            }
        ]
    },
    {
        id: 2,
        name: 'Jah',
        post: 'Am I secure?',
        comments: [
            {
                id: 0,
                content: 'no. git gud.'
            },
            {
                id: 1,
                content: 'Security is not a destination, but a journey.'
            }
        ]
    }
]

let id = 3

module.exports = {
    getForumPosts: (req, res) => {
        res.status(200).send(forumPosts)
    },

    createForumPosts: (req, res) => {
        forumPosts.push({
            id: id,
            name: req.body.name,
            post: req.body.post,
            comments: []
        })

        id++

        res.status(200).send(forumPosts)
    },

    addComment: (req, res) =>{
        const {id} = req.params
        const {content} = req.body

        const index = forumPosts.findIndex((forumPosts) => {
            return +id === forumPosts.id
        })

        forumPosts[index].comments.push({id: forumPosts[index].comments.length, content: content})

        res.status(200).send(forumPosts)
    },

    deleteForumPosts: (req, res) => {
        const {id} = req.params
        console.log(id)

        const index = forumPosts.findIndex((forumPosts) => {
            return +id === forumPosts.id
        })

        forumPosts.splice(index, 1)

        res.status(200).send(forumPosts)
    }
}