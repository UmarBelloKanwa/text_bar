import { dataBase } from "./model.js";
(() => {
  if (!localStorage.getItem('USER_DATA')) {
     location.href = 'sign_up.html';
  } 
})(); 
class View {
   constructor() {
    this.document = document;
    this.when_no_note = document.getElementById('no-note');
    this.noteList = document.querySelector('[title=note-lists]');
    this.searchInput = document.querySelector('input');
    this.createButton = this.document.querySelector('footer > img:first-child');
    this.homeStyle();
   } 
   homeStyle() {
    let setting = JSON.parse(localStorage.getItem('setting'));
    if (setting) {
      if (setting.blackMode != '') {
        this.document.body.style.backgroundColor = 'rgba(0, 0, 0, 1)';
      }
      this.document.body.style.backgroundColor = setting.backgroundColor;
    }
   }
   displayNotes(note) {
    this.when_no_note.style.display = 'none';
    let noteDiv = document.createElement('div');
    noteDiv.style = `
       color : ${note.value.text_styles.color};
       font-family : ${note.value.text_styles.fontFamily};
       font-size : ${note.value.text_styles.fontSize};
       text-align : ${note.value.text_styles.textAlign};
       font-style : ${note.value.text_styles.fontStyle};
       font-variant : ${note.value.text_styles.fontVariant};
       font-weight : ${note.value.text_styles.fontWeight};
       font-shadow : ${note.value.text_styles.textShadow};
       background : ${note.value.background_styles.color + ' url(' + note.value.background_styles.image + ')'};
    `;
    let head = document.createElement('h1');
    head.textContent = note.value.title;
    let content = document.createElement('p');
    content.textContent = note.value.text;
    if (note.value.pictures.length) {
        let img = document.createElement('img');
        img.src = note.value.pictures[note.value.pictures.length -1];
        noteDiv.appendChild(img);
        [head, content].forEach(el => el.style.width = '78%');
        noteDiv.style.textAlign = 'left';
    }
    let dateEl = document.createElement('span');
    dateEl.textContent = note.value.date;
    noteDiv.append(head, content, dateEl);
    this.noteList.appendChild(noteDiv);
    let id = note.value.id;
    noteDiv.addEventListener('click', () => this.ClickingOverNote(id));
  }
  ClickingOverNote(noteId) {
    localStorage.setItem('noteId', noteId);
    document.location = 'note.html';
  }
}
class Controller {
    constructor(dataBase, View) {
        this.model = dataBase;
        this.view = new View();
        this.displayNotes();
        this.view.createButton.addEventListener('click', () => this.createNewNote());
        this.view.searchInput.addEventListener('input', () => this.search(event));
    }
    displayNotes() {
        const display = () => {
          this.view.noteList.innerHTML = '';
          const cursorRequest = this.model.displayNotes();
          if (cursorRequest) {
            cursorRequest.addEventListener('success', () => this.gettingNotesSucceed(event));
          }
        }
        setTimeout(display, 1000);
    }
    gettingNotesSucceed(ev) {
        const cursor = ev.target.result;
        if (cursor) {
            this.view.displayNotes(cursor);
            cursor.continue();
        }
    }
    search(input) {
        var names, find, name, letters;
        names = document.querySelectorAll('section div h1');
        find = input.target.value.toLowerCase();
        for (name of names) {
          letters = name.innerText.toLowerCase().search(find);
          if (letters > -1) {
            name.parentElement.style.display = 'block';
          } else {
            name.parentElement.style.display = 'none';
          }
        }
    }
    createNewNote() {
        localStorage.removeItem('noteId');
        this.view.document.location = 'note.html';
    }    
}
const controller = new Controller(dataBase, View);