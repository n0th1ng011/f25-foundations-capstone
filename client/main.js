const nameInput = document.querySelector('#name-input')
const postInput = document.querySelector('#post-input')

let commentText = ''

function deleteHandler(id) {
    axios.delete(`http://localhost:4000/api/forumPosts/${id}`)
        .then(res => {
            createForumPostsHTML(res.data)
        })
}

function commentFormHandler(id) {
    axios.put(`http://localhost:4000/api/forumPosts/${id}`, {content: commentText})
        .then(res => {
            createForumPostsHTML(res.data)
        })
}

function commentTextHandler(e) {
    commentText = e.target.value
}

function createForumPostHTML(arr) {
    const forumPostList = document.getElementById('post-list')

    forumPostList.innerHTML = ''

    arr.forEach(forumPosts => {
        const postSection = document.createElement('section')
        const postName = document.createElement('h3')
        const postPost = document.createElement('p')
        const deleteBtn = document.createElement('button')

        postName.textContent = forumPosts.name
        postPost.textContent = forumPosts.post
        deleteBtn.textContent = 'delete'

        deleteBtn.addEventListener('click', () => {
            deleteHandler(forumPosts.id)
        })

        postSection.appendChild(postName)
        postSection.appendChild(postPost)
        postSection.appendChild(deleteBtn)

        forumPosts.comments.forEach(rev => {
            const commentParagraph = document.createElement('p')
            commentParagraph.textContent = rev.content

            postSection.appendChild(commentParagraph)
        })

        const commentForm = document.createElement('form')
        commentForm.innerHTML = `<input type="text" placeholder="leave a comment" class="comment-text"/> <button>submit<button>`

        commentForm.addEventListener('submit', (e) => {
            e.preventDefault()
            commentFormHandler(forumPosts.id)
        })

        postSection.appendChild(commentForm)

        forumPostList.appendChild(postSection)
    })

    const commentTextInputs = document.querySelectorAll('.comment-text')
    if(commentTextInputs) {
        commentTextInputs.forEach(input => input.addEventListener('input', commentTextHandler))
    }
}

function getAllPosts() {
    axios.get('hhtp://localhost:400/api/forumPosts')
        .then(res => {
            createForumPostHTML(res.data)
        })
}

function submitHandler(e) {
    e.preventDefault()

    if (nameInput.value && postInput.value) {
        axios.post('http://localhost:4000/api/forumPosts', {
            name: nameInput.value,
            post: postInput.value
        })
    } else {
        alert('You need to give both a name and something to post')
    }
}

window.addEventListener('load', getAllPosts)

document.querySelector('form').addEventListener('submit', submitHandler)