
const params = new URLSearchParams(window.location.search);
const slug = params.get('slug');

// halaman index
// halaman index
if (document.getElementById('posts')) {
  let allPosts = [];

  fetch('posts/posts.json')
    .then(res => res.json())
    .then(posts => {
      // SORT TERBARU
      allPosts = posts.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      renderPosts(allPosts);
    });

  document.getElementById('search').addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    const filtered = allPosts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.join(' ').toLowerCase().includes(q)
    );
    renderPosts(filtered);
  });

  function renderPosts(posts) {
    const list = document.getElementById('posts');
    list.innerHTML = '';

    posts.forEach(p => {
      list.innerHTML += `
        <article class="post-item">
          <h2>
            <a href="post.html?slug=${p.slug}">
              ${p.title}
            </a>
          </h2>

          <div class="post-meta">
            ${p.date} · ${p.category}
          </div>

          <p class="post-excerpt">
            ${p.excerpt ?? 'Klik untuk membaca selengkapnya…'}
          </p>
        </article>
      `;
    });
  }
}


// halaman post
if (slug) {
  let currentPost = null;

  fetch('posts/posts.json')
    .then(r => r.json())
    .then(posts => {
      currentPost = posts.find(p => p.slug === slug);

      if (!currentPost) {
        throw new Error('Post tidak ditemukan');
      }

      return fetch('posts/' + currentPost.file);
    })
    .then(r => r.text())
    .then(md => {
      const meta = document.getElementById('meta');

      meta.innerHTML = `
        <p>
          <strong>Kategori:</strong> ${currentPost.category}<br>
          <strong>Tag:</strong>
          ${currentPost.tags
          .map(t => `<span class="tag">${t}</span>`)
          .join(' ')}
        </p>
      `;

      document.getElementById('content').innerHTML =
        marked.parse(md);
    })
    .catch(err => {
      document.getElementById('content').innerHTML =
        '<p>Artikel tidak ditemukan.</p>';
      console.error(err);
    });
}
