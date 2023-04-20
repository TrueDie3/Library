const main = document.querySelector("main");
const row = document.querySelector("row");
const myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	if (this.pages > 0) {
		this.pages += " pages";
	}
	this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
	const book = new Book(title, author, pages, read);
	myLibrary.push(book);
}

const button = document.createElement("button");
button.classList.add("plus");
main.appendChild(button);
button.textContent = "Add new book";

function createCard() {
	if (myLibrary.length > 0) {
		const card = document.createElement("article");
		const div = document.createElement("div");
		main.appendChild(card);
		const bookId = myLibrary.length - 1;
		card.setAttribute("id", `${bookId}`);
		const h4 = document.createElement("h4");
		const ul = document.createElement("ul");
		card.appendChild(ul);
		ul.appendChild(h4);
		for (let j = 0; j <= 3; j++) {
			const li = document.createElement("li");
			ul.appendChild(li);
		}
		for (let i = 0; i < myLibrary.length; i++) {
			// Screen values
			h4.textContent = myLibrary[i].title;
			ul.childNodes[1].textContent = myLibrary[i].author;
			ul.childNodes[2].textContent = myLibrary[i].pages;
			ul.childNodes[3].textContent = myLibrary[i].read;
		}
		ul.appendChild(div);
		const deleteBookBtn = document.createElement("button");
		div.appendChild(deleteBookBtn);
		deleteBookBtn.innerHTML = "&#x2716;";
		deleteBookBtn.classList.add("delete-button");
		deleteBookBtn.addEventListener("click", () => {
			myLibrary.splice(bookId, 1);
			main.removeChild(card);
		});
		if (ul.childNodes[3].textContent === "readed") {
		} else {
			const readButton = document.createElement("button");
			readButton.classList.add("read-button");
			readButton.innerHTML = "&#x2713;";
			div.appendChild(readButton);
			readButton.addEventListener("click", () => {
				myLibrary[bookId].read = "readed";
				ul.childNodes[3].textContent = myLibrary[bookId].read;
				ul.childNodes[3].style.cssText = "color:green;";
				div.removeChild(readButton);
			});
		}
	}
}

// button
const plus = document.querySelector(".plus");
function createForm() {
	const form = document.createElement("form");
	main.appendChild(form);

	for (let j = 0; j <= 2; j++) {
		const input = document.createElement("input");
		input.setAttribute("type", "text");
		form.appendChild(input);
	}
	// Screen values
	form.childNodes[0].setAttribute("placeholder", "title");
	form.childNodes[1].setAttribute("placeholder", "author");
	form.childNodes[2].setAttribute("placeholder", "pages");

	//readed input
	const label = document.createElement("label");
	label.innerHTML = "Readed? <br>";
	form.appendChild(label);
	const readed = document.createElement("input");
	readed.setAttribute("type", "checkbox");
	readed.value = "";
	label.appendChild(readed);
	function isReaded() {
		if (this.checked) {
			this.value = "readed";
		}
	}
	readed.addEventListener("change", isReaded);

	// submit btn
	const submit = document.createElement("input");
	submit.value = "Submit";
	submit.setAttribute("type", "submit");
	form.appendChild(submit);
	submit.addEventListener("click", function (event) {
		if (
			form.childNodes[0].value &&
			form.childNodes[1].value &&
			form.childNodes[2].value > 0
		) {
			addBookToLibrary(
				form.childNodes[0].value,
				form.childNodes[1].value,
				form.childNodes[2].value,
				readed.value
			);
			createCard();
			main.removeChild(form);
			main.appendChild(plus);
		} else {
			alert("error");
			if (form.childNodes[0].value < 1) {
				form.childNodes[0].classList.toggle("alert");
			}
			if (form.childNodes[1].value < 1) {
				form.childNodes[1].classList.toggle("alert");
			}
			if (form.childNodes[2].value) {
				form.childNodes[2].classList.toggle("alert");
			}
		}
		event.preventDefault();
	});

	// exit btn
	const exit = document.createElement("button");
	exit.classList.add("exit");
	exit.textContent = "Exit";
	form.appendChild(exit);
	exit.addEventListener("click", function () {
		main.removeChild(form);
		main.appendChild(plus);
	});
}

const form = document.querySelector("form");

plus.addEventListener("click", () => {
	createForm();
	main.removeChild(plus);
});
