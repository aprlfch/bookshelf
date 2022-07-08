const COMPLETED_BOOK = "completeBookshelfList";
const UNCOMPLETED_BOOK = "incompleteBookshelfList";

function addBook() {
    const idBook = +new Date();
    const inputBookTitle = document.getElementById("inputBookTitle").value;
    const inputBookAuthor = document.getElementById("inputBookAuthor").value;
    const inputBookYear = document.getElementById("inputBookYear").value;
    const inputBookIsComplete = document.getElementById("inputBookIsComplete").checked;

    const book = makeBook(idBook, inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete);
    const bookObject = generateBookObject(idBook, inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete);

    books.push(bookObject);

    if (inputBookIsComplete) {
        document.getElementById(COMPLETED_BOOK).append(book);
    } else {
        document.getElementById(UNCOMPLETED_BOOK).append(book);
    }

    saveData();
}

function makeBook(idBook, inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete) {
    const book = document.createElement("article");
    book.setAttribute("id", idBook)
    book.classList.add("card");

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = inputBookTitle;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = inputBookAuthor;

    const bookYear = document.createElement("p");
    bookYear.innerText = inputBookYear;

    const br = document.createElement("br");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("cardBody");

    const cardContent = document.createElement("div");
    cardContent.classList.add("cardContent");

    const cardAction = addAction(inputBookIsComplete, idBook);

    cardContent.append(bookTitle, bookAuthor, bookYear,);
    cardContainer.append(cardContent);
    cardContainer.append(cardAction);
    book.append(cardContainer);

    return book;
}

function addAction(inputBookIsComplete, idBook) {
    const cardActions = document.createElement("div");

    const actionDelete = deleteAction(idBook);
    const actionRead = readAction(idBook);
    const actionUndo = undoAction(idBook);

    cardActions.append(actionDelete);

    if (inputBookIsComplete) {
        cardActions.append(actionUndo);
    } else {
        cardActions.append(actionRead);
    }

    return cardActions;
}

function deleteAction(idBook) {
    const actionDelete = document.createElement("button");
    actionDelete.innerHTML = '<ion-icon name="close"></ion-icon>';

    actionDelete.addEventListener("click", function () {
        let alert = confirm("Apakah anda yakin ingin menghapus buku?");

        if (alert) {
            const cardParent = document.getElementById(idBook);
            cardParent.addEventListener("eventDelete", function (event) {
                event.target.remove();
            });
            cardParent.dispatchEvent(new Event("eventDelete"));

            deleteBookFromJson(idBook);
            saveData();
        }
    });

    return actionDelete;
}

function readAction(idBook) {
    const actionRead = document.createElement("button");
    actionRead.innerHTML = '<ion-icon name="checkmark"></ion-icon>';

    actionRead.addEventListener("click", function () {
        const cardParent = document.getElementById(idBook);

        const bookTitle = cardParent.querySelector(".cardContent > h3").innerText;
        const bookAuthor = cardParent.querySelectorAll(".cardContent > p")[0].innerText;
        const bookYear = cardParent.querySelectorAll(".cardContent > p")[1].innerText;

        cardParent.remove();

        const book = makeBook(idBook, bookTitle, bookAuthor, bookYear, true);
        document.getElementById(COMPLETED_BOOK).append(book);

        deleteBookFromJson(idBook);
        const bookObject = generateBookObject(idBook, bookTitle, bookAuthor, bookYear, true);

        books.push(bookObject);
        saveData();
    })

    return actionRead;
}

function undoAction(idBook) {
    const actionUndo = document.createElement("button");
    actionUndo.innerHTML = '<ion-icon name="refresh"></ion-icon>';

    actionUndo.addEventListener("click", function () {
        const cardParent = document.getElementById(idBook);

        const bookTitle = cardParent.querySelector(".cardContent > h3").innerText;
        const bookAuthor = cardParent.querySelectorAll(".cardContent > p")[0].innerText;
        const bookYear = cardParent.querySelectorAll(".cardContent > p")[1].innerText;

        cardParent.remove();

        const book = makeBook(idBook, bookTitle, bookAuthor, bookYear, false);
        document.getElementById(UNCOMPLETED_BOOK).append(book);

        deleteBookFromJson(idBook);
        const bookObject = generateBookObject(idBook, bookTitle, bookAuthor, bookYear, false);

        books.push(bookObject);
        saveData();
    })

    return actionUndo;
}

function bookSearch(keywords) {
    const filter = keywords.toUpperCase();
    const titles = document.getElementsByTagName("h3");

    for (let i = 0; i < titles.length; i++) {
        const titlesValue = titles[i].textContent || titles[i].innerText;

        if (titlesValue.toUpperCase().indexOf(filter) > -1) {
            titles[i].closest(".card").style.display = "";
        } else {
            titles[i].closest(".card").style.display = "none";
        }
    }
}