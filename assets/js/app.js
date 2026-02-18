
const params = new URLSearchParams(window.location.search);
const slug = params.get('slug');

// halaman index
if (document.getElementById('posts')) {
  let allPosts = [];

  fetch('posts/posts.json')
    .then(res => res.json())
    .then(posts => {
      // SORTING
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
      <article class="border-b pb-6">
        <h2 class="text-xl font-semibold">
          <a href="post.html?slug=${p.slug}"
             class="hover:underline">
            ${p.title}
          </a>
        </h2>

        <div class="text-sm text-gray-500 mt-1">
          ${p.date} · ${p.category}
        </div>

        <p class="mt-3 text-gray-700">
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
        throw new Error('Artikel tidak ditemukan');
      }

      return fetch('posts/' + currentPost.file);
    })
    .then(r => r.text())
    .then(md => {
      const meta = document.getElementById('meta');

      meta.innerHTML = `
        <div class="flex flex-col gap-3">

      <!-- Kategori -->
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-500">Kategori:</span>
        <span class="bg-blue-100 text-blue-700
                     px-2 py-0.5 rounded text-xs">
          ${currentPost.category}
        </span>
      </div>

      <!-- Tag -->
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-sm text-gray-500">Tag:</span>
        ${currentPost.tags.map(t => `
          <span class="bg-gray-200 text-gray-700
                       px-2 py-0.5 rounded text-xs">
            ${t}
          </span>
        `).join('')}
      </div>

    </div>
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
