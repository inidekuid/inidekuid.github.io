const searchInput = document.getElementById("search");
const postItems = Array.from(document.querySelectorAll(".post-item"));

if (searchInput && postItems.length > 0) {
  searchInput.addEventListener("input", (event) => {
    const keyword = event.target.value.toLowerCase().trim();

    postItems.forEach((item) => {
      const haystack = item.dataset.search || "";
      const visible = keyword === "" || haystack.includes(keyword);
      item.style.display = visible ? "" : "none";
    });
  });
}
