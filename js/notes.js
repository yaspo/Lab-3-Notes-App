class Note {
  constructor(title) {
    this.title = title;
    this.note = this.createElement(title);
  }
  
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

    a.addEventListener('click', this.remove.bind(newNote));
    
    return newNote;
  }
  
  add(){
    // HINT🤩
    // this function should append the note to the screen somehow
    let notes = document.querySelector('.notes');
    notes.appendChild(this.note);
  }
  
  saveToStorage(){
    // HINT🤩
    // localStorage only supports strings, not arrays
    // if you want to store arrays, look at JSON.parse and JSON.stringify
  }
  
  remove(){
    // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
    // in this function, 'this' will refer to the current note element
  } 
}

class App {
  constructor() {
    console.log("👊🏼 The Constructor!");
  
    // HINT🤩
    // clicking the button should work
    // pressing the enter key should also work
    // this.btnAdd = ???
    // this.btnAdd.addEventListener("click", this.createNote.bind(this));
    // this.loadNotesFromStorage();
  }
  
  loadNotesFromStorage() {
    // HINT🤩
    // load all notes from storage here and add them to the screen
    // something like note.add() in a loop would be nice
  }
   
  createNote(e){
    // this function should create a new note by using the Note() class
    
    // HINT🤩
    // note.add();
    // note.saveToStorage();
    // this.reset();
  }
  
  reset(){
    // this function should reset the form 
  }
  
}

let app = new App();

let note1 = new Note("TEstinng");
note1.add();