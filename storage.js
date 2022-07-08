const BOOKS_KEY = "BOOKSHELF_APPS";

let books = [];

function isStorageExist() {
    if (typeof Storage === "undefined") {
        alert("Browser anda tidak mendukung web storage!");
        return false;
    } else {
        return true;
    }
}

function saveData() {
    if (isStorageExist()) {
        localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
    }
}

function loadDataFromStorage() {
    let data = JSON.parse(localStorage.getItem(BOOKS_KEY));

    if (data !== null) {
        books = data;
    }

    document.dispatchEvent(new Event("onjsonfetched"));
}

function generateBookObject(id, title, author, year, isComplete) {
    return {
        id, 
        title, 
        author,
        year, 
        isComplete,
    };
}


function renderFromBooks() {
    for (book of books) {
        const newBook = makeBook(book.id, book.title, book.author, book.year, book.isComplete);

        if (book.isComplete) {
            document.getElementById(COMPLETED_BOOK).append(newBook);
        } else {
            document.getElementById(UNCOMPLETED_BOOK).append(newBook);
        }
    }
}

function deleteBookFromJson(idBook) {
    for (let arrayPosition = 0; arrayPosition < books.length; arrayPosition++) {
        if (books[arrayPosition].id == idBook) {
            books.splice(arrayPosition, 1);
            break;
        }
    }
}
