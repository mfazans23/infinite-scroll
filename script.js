const filter = document.getElementById("filter-input");
const postsEl = document.getElementById("posts__list");
const loading = document.getElementById("loader");

let posts = [];

async function getPosts() {
  const page = posts.length / 5 + 1;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=4&_page=${page}`
  );
  const data = await res.json();
  posts.push(...data);
}

async function displayPost(argPosts = posts) {
  postsEl.innerHTML = argPosts
    .map((post) => {
      return `<div class="posts__item">
                <div class="post__number">${post["id"]}</div>
                <div class="post__title">${post["title"]}</div>
                <div class="post__body">${post["body"]}</div>
              </div>`;
    })
    .join("");
}

function showLoading() {
  loading.classList.add("show");
  setTimeout(() => {
    loading.classList.remove("show");
  }, 1000);
}

window.addEventListener("DOMContentLoaded", async () => {
  await getPosts();
  displayPost();
});

window.addEventListener("scroll", async () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
    await getPosts();
    setTimeout(() => {
      displayPost();
    }, 700);
  }
});

filter.addEventListener("input", (e) => {
  const keyword = e.target.value;
  const filteredPosts = [];
  posts.forEach((post, id) => {
    let postContent = `${post["title"]} ${post["body"]}`;
    if (postContent.includes(keyword)) {
      filteredPosts.push(post);
    }
  });
  displayPost(filteredPosts);
});
