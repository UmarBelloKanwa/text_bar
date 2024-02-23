import { dataBase } from "./model.js";
import { View } from "./view.js";
import { Model } from "./note.js";
import { Canvas } from "./canvas.js";

(() => {
  if (!localStorage.getItem('USER_DATA')) {
     location.href = 'sign_up.html';
  } 
})(); 

class Controller{
  constructor(Model, View, dataBase, Summary) {
    this.model = new Model();
    this.view = new View();
    this.dataBase = dataBase;
    this.canvas = new Canvas();
    this.noteId = Number(localStorage.getItem('noteId'));
    if (this.noteId) {
      this.existedNote(this.noteId);
    }
    this.EventsHandling();
  }
  existedNote(noteId) {
    const dataBaseRequest = indexedDB.open('noteDataBase', 1);
    dataBaseRequest.addEventListener('success', () => this.dataBaseSucceed(event, noteId));
    dataBaseRequest.addEventListener('error', () => this.dataBaseError(event));
  }
  dataBaseSucceed(event, noteId) {
    let dataBase = event.target.result;
    let transaction = dataBase.transaction(['notes'], 'readwrite');
    let objectStore = transaction.objectStore('notes');
    let noteRequest = objectStore.get(noteId);
    noteRequest.addEventListener('success', (event) => { 
      this.gettingNoteSucceed(event.target.result);
    });
  }
  gettingNoteSucceed(note) {
    if (note) {
      this.model = note;
      this.update();
    }
  }
  requestCompleted(event) {
    let result = event.target.result;
    if (result) {
      result.close();
    }
  }
  dataBaseError(event) {
    window.alert('AN ERROR OCURED ' + event.target.error);
  }
  speechNote() {
     const { title, note_text, note_picture } = this.view;
     const titleLength = title.value.length;
     const descriptionLength = note_text.value.length;
     let textToSpeak = titleLength ? `Note title is ${title.value}. ` : 'You did not write the title of the note. ';
     textToSpeak += descriptionLength ? `Note description is ${note_text.value}. ` : 'You did not write the description of the note. ';
     const totalCharacters = titleLength + descriptionLength;
     textToSpeak += `You saved ${totalCharacters} characters. With ` + note_picture.childNodes.length + ' photos';
     const speechSupport = 'speechSynthesis' in window || 'webkitSpeechthis.recognition' in window;
     speechSupport ? window.speechSynthesis.speak(new SpeechSynthesisUtterance(textToSpeak)) : alert('Your browser does not support speech synthesis.');
  }
  startRecognition() {
     let listen_button = document.getElementById('hearing');
     this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
     this.recognition.lang = 'en-US';
     let transcript;
     this.recognition.onresult = event => {
        transcript = event.results[event.resultIndex][0].transcript;
        this.model.text = transcript;
        this.update();
     };
     this.recognition.onerror = event => {
        alert('Error occurred. Please try again.');
     };
     this.recognition.onend = () => {
        listen_button.textContent = 'Stopped.';
        
     };
     this.recognition.start();
     listen_button.textContent = 'Listening...';
  }
  stopRecognition() {
     if (this.recognition) {
       this.recognition.stop();
     }
  }
  inputElements(input) {
    switch(input) {
      case this.view.title :
        this.model.title = input.value;
        this.model.background_styles.titleHeight = input.scrollHeight;
        break;
      case this.view.note_text :
        this.model.text = input.value;
        this.model.background_styles.textHeight = input.scrollHeight;
        break;
      case this.view.upload_picture_inputs[0] :
      case this.view.upload_picture_inputs[1] :
        let reader = new FileReader();
        reader.onload = () => {
          this.model.pictures.push(reader.result);
          this.view.savedPictures(this.model); 
        };
        reader.readAsDataURL(input.files[0]);
        break;
      case this.view.text_color_input :
        this.model.text_styles.color = input.value;
        break;
      case this.view.font_family_select :
        this.model.text_styles.fontFamily = input.value;
        break;
      case this.view.font_size_input :
        this.model.text_styles.fontSize = input.value;
      //  this.model.background_styles.titleHeight += 2;
       // this.model.background_styles.textHeight += 2;
        break;
      case this.view.text_align_select :
        this.model.text_styles.textAlign = input.value;
        break;
      case this.view.font_style_checkbox :
        this.model.text_styles.fontStyle = input.checked ? 'italic' : '';
        break;
      case this.view.font_variant_checkbox :
        this.model.text_styles.fontVariant = input.checked ? 'small-caps' : '';
        break;
      case this.view.font_weight_checkbox :
        this.model.text_styles.fontWeight = input.checked ? 'bold' : '';
        break;
      case this.view.text_shadow_checkbox :
        this.model.text_styles.textShadow = input.checked ? '2px 2px 5px blue' : '';
        break;
      case this.view.upload_background_img_input :
       let myReader = new FileReader();
        myReader.onload = () => {
          this.model.background_styles.image = myReader.result;
          this.view.uploadBackgroundPicture(this.model); 
          this.view.update(this.model);
        };
        myReader.readAsDataURL(input.files[0]);
        break;
      case this.view.background_color_input :
        this.model.background_styles.image = '';
        this.model.background_styles.color = input.value;
        break;
      case this.view.light_mode_box :
        this.model.background_styles.image = ''
        this.model.text_styles.color =  input.checked ? '#333333' : '#ffffff';
        this.model.background_styles.color = input.checked ? '#ffffff' : '#333333';
        this.model.background_styles.lightMode = input.checked ? 'yes' : '';
      }
      this.update();
  }
  backgroundImage(img) {
    this.model.background_styles.image = img.src;
    this.update();
  }
  update() {
    this.view.title.value = this.model.title;
    this.view.note_text.value = this.model.text;
    this.view.text_color_input.value = this.model.text_styles.color;
    this.view.font_family_select.value = this.model.text_styles.fontFamily;
    this.view.font_size_input.value = this.model.text_styles.fontSize;
    this.view.text_align_select.value = this.model.text_styles.textAlign;
    this.view.font_style_checkbox.value = this.model.text_styles.fontStyle;
    this.view.font_variant_checkbox.value = this.model.text_styles.fontVariant;
    this.view.font_weight_checkbox.value = this.model.text_styles.fontWeight;
    this.view.text_shadow_checkbox.value = this.model.text_styles.textShadow;
    this.view.background_color_input.value = this.model.background_styles.color;
    this.view.light_mode_box.value = this.model.background_styles.lightMode;
    [ this.view.font_style_checkbox, this.view.font_variant_checkbox, this.view.font_weight_checkbox,
      this.view.text_shadow_checkbox, this.view.light_mode_box].forEach(box => {
        if (box.value != '') {
          box.checked = true;
        }
      });
    this.view.update(this.model);
  }
  printAsImg() {
     const dataUrl = this.canvas.convert(this.model).toDataURL('image/png');
     const link = document.createElement('a');
     link.href = dataUrl;
     link.download = (this.model.title.slice(0, 12) || this.model.text.slice(0, 12) || 'note') + '.png';
     link.click();
  }
  saveAsTextFile() {
     if (this.model.title.length || this.model.text.length) {
        var text = this.model.title + '\n \n' + this.model.text;
        var blob = new Blob([text], { type: "text/plain" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = (this.model.title.slice(0, 12) || this.model.text.slice(0, 12) || 'note') + '.txt';
        link.click(); URL.revokeObjectURL(link.href);
     } else { 
       window.alert("Could'nt download empty note");
     }
  }
  saveAsAudioFile() {
     const utterance = new SpeechSynthesisUtterance(this.model.title + '. ' + this.model.text);
     if (this.model.title.length || this.model.text.length) {
        const blob = new Blob([utterance], { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.href = url;
        link.download = (this.model.title.slice(0, 12) || this.model.text.slice(0, 12) || 'note') + '.mp3';
        link.click();
     } else { 
       window.alert("Could'nt download empty audio");
     }
  }
  noteInformtion() {
    window.alert(
       'Title: ' + this.model.title + '\n' +
       'Note: ' + this.model.text.slice(15) + '\n' +
       'Date: ' + this.model.date + '\n' +
       'Pictures: ' + this.model.pictures.length
    );
  }
  save() {
    if (this.model.title.trim().length || this.model.text.trim().length || this.model.pictures.length) {
       if (!this.noteId) {
          this.dataBase.addNote(this.model).onsuccess = () => { return; };
       } else {
         this.dataBase.updateNote(this.model).onsuccess = () => { return; };
       }
    } 
    if (this.noteId && !this.model.title.trim().length &&  !this.model.text.trim().length && !this.model.pictures.length) {
      this.delete();
    }
    this.view.document.location = 'index.html';
  }
  delete() {
    if (confirm('Are you sure you want to delete the note')) {
       this.dataBase.deleteNote(this.noteId).onsuccess = () => {
          this.view.document.location = 'index.html';
       }
    }
  }
  quitNote() {
    if (confirm('Are you sure you want to exit without saving the note')) {
      this.view.document.location = 'index.html';
    }
  }
  EventsHandling() {
    this.update()
    document.addEventListener('DOMContentLoaded', () => this.view.firstEvents());
    this.view.listen_icon.addEventListener('click', () => this.speechNote());
    this.view.customize_icon.addEventListener('click', (ev) => { 
       ev.stopPropagation();
       this.view.styling_box.removeAttribute('hidden');
    });
    this.view.speech_icon.addEventListener('click', () => {
       if (this.recognition && this.recognition.running) {
         this.stopRecognition();
       } else {
         this.startRecognition();
       }
    });
    [ this.view.title, this.view.note_text, this.view.text_color_input, this.view.font_family_select, this.view.font_size_input,
      this.view.text_align_select, this.view.font_style_checkbox, this.view.font_variant_checkbox, this.view.font_weight_checkbox,
      this.view.text_shadow_checkbox, this.view.upload_background_img_input, this.view.background_color_input, this.view.light_mode_box].forEach(input => {
        input.addEventListener('input', () => this.inputElements(event.target));
    });
    this.view.upload_picture_inputs.forEach(input => { 
      input.addEventListener('change', () => this.inputElements(event.target));
    });
    this.view.background_images.forEach(img => img.addEventListener("click", () => {
      this.backgroundImage(event.target);
    }));
    this.view.put_date.addEventListener('click', () => {
     this.view.note_text.value += new Date().toDateString();
     this.model.text = this.view.note_text.value;
    });
    this.view.noteInfButton.addEventListener('click', () => this.noteInformtion());
    this.view.saveButton.forEach(button => button.addEventListener('click', () => this.save()));
    this.view.printButton.addEventListener('click', () => { window.print(); })
    this.view.printAsImgButton.addEventListener('click', () => this.printAsImg())
    this.view.saveAsTextFileButton.addEventListener('click', () => this.saveAsTextFile());
    this.view.saveAsAudioFileButton.addEventListener('click', () => this.saveAsAudioFile());
    this.view.deleteButton.addEventListener('click', () => this.delete());
    this.view.exitButton.addEventListener('click', () => this.quitNote());
  }
}
new Controller(Model, View, dataBase);