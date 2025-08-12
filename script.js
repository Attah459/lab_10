
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

xhrBtn.addEventListener("click", () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/2");
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            showData(data);
        } else {
            showError(`Server Error: ${xhr.status}`);
        }
    };
    xhr.onerror = function () {
        showError("Network Error: Unable to reach server.");
    };
    xhr.send();
});

postForm.addEventListener("submit", e => {
    e.preventDefault();
    const title = document.getElementById("postTitle").value.trim();
    const body = document.getElementById("postBody").value.trim();

    if (!title || !body) {
        showError("Please provide both a title and body.");
        return;
    }

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, userId: 1 })
    })
        .then(response => {
            if (!response.ok) throw new Error(`Server Error: ${response.status}`);
            return response.json();
        })
        .then(data => {
            dataDisplay.innerHTML = `<p>Post created successfully!</p><pre>${JSON.stringify(data, null, 2)}</pre>`;
            errorDisplay.textContent = "";
        })
        .catch(err => showError(err.message));
});

putForm.addEventListener("submit", e => {
    e.preventDefault();
    const id = document.getElementById("putId").value.trim();
    const title = document.getElementById("putTitle").value.trim();
    const body = document.getElementById("putBody").value.trim();

    if (!id || !title || !body) {
        showError("Please fill in all fields.");
        return;
    }