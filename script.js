const posts = [
  {
    id: "123",
    title: "Getting Started with HTML",
    image: "https://source.unsplash.com/400x300/?html,code",
    preview: "Learn the basic structure of HTML documents."
  },
  {
    id: "124",
    title: "CSS Flexbox Mastery",
    image: "https://source.unsplash.com/400x300/?css,layout",
    preview: "Discover how to use Flexbox for responsive layouts."
  },
  {
    id: "125",
    title: "JavaScript DOM Crash Course",
    image: "https://source.unsplash.com/400x300/?javascript,web",
    preview: "Master DOM manipulation using vanilla JavaScript."
  }
];

const container = document.querySelector(".blog-posts");
posts.forEach(p => {
  container.innerHTML += `
    <article class="post">
      <img src="${p.image}" alt="${p.title}" />
      <div class="post-content">
        <h2><a href="post.html?id=${p.id}">${p.title}</a></h2>
        <p>${p.preview}</p>
      </div>
    </article>`;
});
