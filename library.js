let myLibrary = [];

let htmlBook = 
`
<div class="book-card">
<div class="caratula-card" style="background-image: url(***);"></div>
<div class="info-card flex">
    <h2 class="title-card">***</h2>
    <p class="descriprion-card">***</p>
    <p class="author-card"><strong>***</strong></p>
    <p class="pages-card"><em>*** pages</em></p>
    <div class="buttons-card">
        <label class="switch">
            <input type="checkbox" ***>
            <span class="slider round"></span>
        </label>
        <div id="***">
            <button class="button-card edit-button"><span class="material-symbols-outlined">edit</span></button>
            <button class="button-card delete-button"><span class="material-symbols-outlined">delete</span></button>  
        </div>   
    </div>
</div>
</div>
`;

let bookSection = document.querySelector("#books-section");
let addButton = document.querySelector("#add-button");
let addModal = document.querySelector("#add-modal");
let cancelModalButton = document.querySelector("#cancel-modal-button");
let addForm = document.querySelector("#add-form");

addButton.addEventListener("click", () => {
    addModal.classList.remove("hidden");
});

cancelModalButton.addEventListener("click", () =>{
    addModal.classList.add("hidden");
});

addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let title = event.target.title.value;
    let author = event.target.author.value;
    let description = event.target.description.value;
    let parseInput = parseInt(event.target.pages.value);
    let pages = (isNaN(parseInput)) ? undefined : parseInput;
    let read = event.target.read.checked;
    let cover = event.target.cover.value;
    addBookToLibrary(new Book(title, description, author, pages, read, cover));
    showLibrary(myLibrary);
    cancelModalButton.click();
})

function Book(title, description, author, pages, read, cover){
    this.title = title;
    this.description = description;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.cover = cover;
}

function addBookToLibrary(Book){
    myLibrary = myLibrary.concat(Book);
}

function getIndex(event){
    let index;
    if(event.target.nodeName == "SPAN"){
        index = parseInt(event.target.parentNode.parentNode.id);
    }else{
        index = parent(event.target.parentNode.id);
    }

    return index;
}

function removeBook(index){
    if(index != 0){
        let initial = myLibrary.slice(0, index);
        let final = myLibrary.slice(index + 1, myLibrary.length);
        myLibrary = initial.concat(...final);
    }else{
        myLibrary = myLibrary.slice(1, myLibrary.length)
    } 
}

function showLibrary(library){

    bookSection.innerHTML = "";
    let c = 0;

    library.forEach(element => {
        let html = htmlBook.replace("***", element.cover);
        html = html.replace("***", element.title);
        html = html.replace("***", element.description);
        html = html.replace("***", element.author);
        html = (element.pages != undefined) ? html.replace("***", element.pages) : html.replace("***", "Unknown");
        html = (element.read) ? html.replace("***", "checked") : html.replace("***", "unchecked");
        html = html.replace("***", c);

        bookSection.innerHTML += html;
        c++;
    });
    
    let deleteButtons = [...document.querySelectorAll(".delete-button")];

    deleteButtons.forEach(element => {
        element.addEventListener("click", event => {
            
            let index = getIndex(event);
            removeBook(index);
            showLibrary(myLibrary);
        });
    })
}

showLibrary(myLibrary);