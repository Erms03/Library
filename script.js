const add = document.querySelector(".button-add");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close-button");
const bookContainer = document.querySelector(".books-container");
const accept = document.querySelector(".accept-btn");
let myLibrary = [];

class Book {
  constructor(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

add.addEventListener("click", () => modal.showModal());

close.addEventListener("click", (e) => {
  e.preventDefault();
  modal.close();
});

accept.addEventListener("click", (e) => {
  e.preventDefault();
  const book = new Book(
    crypto.randomUUID(),
    document.querySelector("#title").value,
    document.querySelector("#author").value,
    document.querySelector("#pages").value,
    document.querySelector("#read").checked
  );
  saveBook(book);
  render();
  cleanForm();
  modal.close();
});

bookContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    const bookDiv = e.target.parentElement;
    myLibrary = myLibrary.filter((book) => book.id !== bookDiv.dataset.id);
    bookDiv.remove();
  }
});

function saveBook(book) {
  myLibrary.push(book);
}

function render() {
  bookContainer.innerHTML = "";
  myLibrary.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.dataset.id = book.id;
    bookDiv.innerHTML = `
      <h2>${book.title}</h2>
      <p>${book.author}</p>
      <p>${book.pages}</p>
      <input type="checkbox" class="${book.read ? "read" : "not-read"}" ${
      book.read ? "checked" : ""
    }/>
      <button class="delete-button">Delete</button>
    `;
    bookDiv.style.backgroundColor = book.read ? "green" : "red";

    bookDiv
      .querySelector("input[type='checkbox']")
      .addEventListener("change", (e) => {
        book.read = e.target.checked;
        bookDiv.style.backgroundColor = book.read ? "green" : "red";
      });

    bookContainer.appendChild(bookDiv);
  });
}

function cleanForm() {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#read").checked = false;
}
