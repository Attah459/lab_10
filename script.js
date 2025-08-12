
const fetchBtn = document.getElementById("fetchBtn");
const xhrBtn = document.getElementById("xhrBtn");
const dataDisplay = document.getElementById("dataDisplay");
const errorDisplay = document.getElementById("errorDisplay");
const postForm = document.getElementById("postForm");
const putForm = document.getElementById("putForm");


function showData(data) {
    dataDisplay.innerHTML = `<h3>${data.title}</h3><p>${data.body}</p>`;
    errorDisplay.textContent = "";
}


function showError(message) {
    errorDisplay.textContent = `Error: ${message}`;
    dataDisplay.innerHTML = "";
}


fetchBtn.addEventListener("click", () => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then(response => {
            if (!response.ok) throw new Error(`Server Error: ${response.status}`);
            return response.json();
        })
        .then(data => showData(data))
        .catch(err => showError(err.message));
});