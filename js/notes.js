/* Array to keep track of all notes being added and removed.                        */
/* This is what gets saved to and loaded from localstorage.                         */
/* (it being outside of any class feels unclean; should be part of the app class?)  */
let allNotes = [];

class Note {

  /* Construct note based on title */
  constructor(title) {
    this.title = title;
    this.note = this.createElement(title);
  }
  
  /* Create a note element by creating the related HTML object.                   */
  /* Adds necessary event listeners for the remove function to work for each note */
  createElement(title){
    let newNote = document.createElement('div');
    newNote.setAttribute("class", "card");
    
    let p = document.createElement('p');
    p.innerHTML = `${this.title}`;
    let a = document.createElement('a');
    a.setAttribute("href", "#");
    a.setAttribute("class", "card-remove");
    a.innerHTML = "Remove";

    newNote.appendChild(p);
    newNote.appendChild(a);

    a.addEventListener('click', this.removeFromStorage.bind(this));
    a.addEventListener('click', this.remove.bind(newNote));  
    
    return newNote;
  }
  
  /* Add created notes to page */
  add(){
    let notes = document.querySelector('.notes');
    notes.appendChild(this.note);
  }
  
  /* Save notes to localstorage so they be added again when the page gets reloaded */
  saveToStorage(){
    allNotes.push(this.title);

    let json = JSON.stringify(allNotes);
    localStorage.setItem("notes", json);
  }
  
  /* Remove notes from localstorage so they don't get displayed on reloading the page */
  removeFromStorage() {
    var i = allNotes.indexOf(this.title);
    allNotes.splice(i, 1);

    //code dupe. Fine now, watch out for future.
    let json = JSON.stringify(allNotes);
    localStorage.setItem("notes", json);
  }

  /* Remove note from the page */
  remove(e){
    this.remove();
  } 

}

class App {

  /* Initiates the app by loading notes from localstorage.        */
  /* Creates necessary eventlisteners to use app's functionality  */
  constructor() {
    console.log("👊🏼 The Constructor!");

    this.btnAdd = document.querySelector('#btnAddNote');
    this.btnAdd.addEventListener("click", this.createNote.bind(this));

    this.txtAdd = document.querySelector('#txtAddNote');
    this.txtAdd.addEventListener("keydown", this.createNote.bind(this));

    this.loadNotesFromStorage();
  }
  
  /* Loads notes from localstorage, creates them and adds their title to allNotes */
  loadNotesFromStorage() {
    allNotes = JSON.parse(localStorage.getItem("notes"));
    console.log(allNotes);
    allNotes.map(note => {
                    let newNote = new Note(note); 
                    newNote.add();
    });

  }
  
  /* Creates a note based on the value of the textfield and adds it to the page. */
  createNote(e){
    if (e.type == 'keydown') {
        if (e.which !== 13) {
          //in case the pressed key is not enter, leave the function
          return;
        }
    }

    let title = document.querySelector('#txtAddNote').value;
    let newNote = new Note(title);
    newNote.add();
    this.reset();

    newNote.saveToStorage();
  }
  
  /* Clears out the textfield so it can be re-used */
  reset(){
    let form = document.querySelector('#txtAddNote');
    form.value = "";
    form.focus();
  }
  
}

/* Launch app */
let app = new App();
