// Script to handle post submissions for Enneagram type pages
// The script uses localStorage to persist posts per type across sessions.

document.addEventListener('DOMContentLoaded', () => {
    // Each type page defines data-type on the body element
    const body = document.body;
    const typeKey = body.dataset.type;
    // Only proceed if this is a type page with a posts area
    const postsContainer = document.getElementById('posts-container');
    const form = document.getElementById('post-form');
    const titleInput = document.getElementById('post-title');
    const bodyInput = document.getElementById('post-body');

    if (!typeKey || !postsContainer || !form) {
        return;
    }

    // Helper to display posts from localStorage
    function displayPosts() {
        postsContainer.innerHTML = '';
        const saved = localStorage.getItem(typeKey + '-posts');
        let posts = [];
        try {
            posts = saved ? JSON.parse(saved) : [];
        } catch (e) {
            posts = [];
        }
        posts.forEach(post => {
            const wrapper = document.createElement('div');
            wrapper.className = 'post';
            const h3 = document.createElement('h3');
            h3.textContent = post.title;
            const p = document.createElement('p');
            // Preserve line breaks by replacing newline with <br>
            p.innerHTML = post.body.replace(/\n/g, '<br>');
            wrapper.appendChild(h3);
            wrapper.appendChild(p);
            postsContainer.appendChild(wrapper);
        });
    }

    // Initial display of existing posts
    displayPosts();

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = titleInput.value.trim();
        const content = bodyInput.value.trim();
        if (!title || !content) {
            return;
        }
        const saved = localStorage.getItem(typeKey + '-posts');
        let posts = [];
        try {
            posts = saved ? JSON.parse(saved) : [];
        } catch (e) {
            posts = [];
        }
        posts.push({ title: title, body: content });
        localStorage.setItem(typeKey + '-posts', JSON.stringify(posts));
        // Clear inputs
        titleInput.value = '';
        bodyInput.value = '';
        displayPosts();
    });
});