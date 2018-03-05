let allNotes = [];

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

    a.addEventListener('click', this.removeFromStorage.bind(this));
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
    allNotes.push(this.title);
    let json = JSON.stringify(allNotes);
    localStorage.setItem("notes", json);
    //console.log(json);
    //console.log(allNotes);

  }
  
  //where to call this function?
  //calling in remove would make most sense, but it's out of its scope .. 
  removeFromStorage() {
    var i = allNotes.indexOf(this.title);
    allNotes.splice(i, 1);

    //code dupe, function? Not necessary for now .. but could use one
    let json = JSON.stringify(allNotes);
    localStorage.setItem("notes", json);

    console.log(allNotes);
  }

  remove(e){
    // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
    // in this function, 'this' will refer to the current note element
    
    /* This is a bad idea. Wanted to circumvent scope problems but only created new ones. 
    /* Should aim to fix scope issue some other way instead.
    
    this.removeFromStorage();
    let note = e.currentTarget.parentNode; //this is bad, what if HTML changes?
    note.remove();

    */ 
    
    this.remove();

  } 

}

class App {
  constructor() {
    console.log("👊🏼 The Constructor!");
  
    // HINT🤩
    // clicking the button should work
    // pressing the enter key should also work
    this.btnAdd = document.querySelector('#btnAddNote');
    this.btnAdd.addEventListener("click", this.createNote.bind(this));

    this.txtAdd = document.querySelector('#txtAddNote');
    this.txtAdd.addEventListener("keydown", this.createNote.bind(this));

    this.loadNotesFromStorage();
    /*
    function(e) {
      let key = e.which || e.keyCode;
      if (key === 13) { // 13 is enter
        this.createNote.bind(this);
      }
    }

    */
    /* testing localstorage example
      localStorage.setItem('bgcolor', 'red');
      localStorage.setItem('font', 'Helvetica');
      localStorage.setItem('image', 'myCat.png');
    */
  }
  
  loadNotesFromStorage() {
    // HINT🤩
    // load all notes from storage here and add them to the screen
    // something like note.add() in a loop would be nice

    allNotes = JSON.parse(localStorage.getItem("notes"));
    console.log(allNotes);
    allNotes.map(note => {
                    let newNote = new Note(note); 
                    newNote.add();
    });

  }
   
  createNote(e){
    // this function should create a new note by using the Note() class
    
    // HINT🤩
    // note.add();
    
    // console.log(e);

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

    // note.saveToStorage();
    newNote.saveToStorage();
    // this.reset();

    console.log(allNotes);
  }
  
  reset(){
    // this function should reset the form 
    let form = document.querySelector('#txtAddNote');
    form.value = "";
    form.focus();

  }
  
}

let app = new App();
