function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

async function fetchPostData(id) {
  const resp = await fetch(`posts.json`);
  const all = await resp.json();
  return all.find(p => p.id === id);
}

function renderPost(post) {
  document.getElementById('post-banner').src = post.image;
  document.getElementById('post-title').textContent = post.title;
  document.getElementById('post-meta').textContent = `Posted on ${post.date} by ${post.author}`;
  document.getElementById('post-body').innerHTML = post.content;
}

function renderRelated(posts, currentId) {
  const ul = document.getElementById('related-posts');
  posts.filter(p => p.id !== currentId).slice(0,5).forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="post.html?id=${p.id}">${p.title}</a>`;
    ul.appendChild(li);
  });
}

let comments = {};

function renderComments(postId) {
  const list = document.getElementById('comments-list');
  list.innerHTML = '';
  (comments[postId] || []).forEach(c => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${c.name}:</strong> ${c.text}`;
    list.appendChild(li);
  });
}

function handleCommentForm(postId) {
  document.getElementById('comment-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('comment-name').value.trim();
    const text = document.getElementById('comment-text').value.trim();
    if (!name || !text) return;
    comments[postId] = comments[postId] || [];
    comments[postId].push({ name, text });
    renderComments(postId);
    e.target.reset();
  });
}

async function init() {
  const postId = getQueryParam('id');
  const post = await fetchPostData(postId);
  if (!post) {
    document.body.innerHTML = '<p>Post not found.</p>';
    return;
  }
  renderPost(post);
  const all = await fetch('posts.json').then(r => r.json());
  renderRelated(all, postId);
  renderComments(postId);
  handleCommentForm(postId);
}

document.addEventListener('DOMContentLoaded', init);
