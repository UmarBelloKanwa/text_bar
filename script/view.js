export class View {
  constructor() {
    this.document = document;
    this.date = document.getElementById("date");
    this.note_background = document.querySelector("article");
    this.title = document.getElementById("title");
    this.note_text = document.getElementById("content-texts");
    this.note_inputs = [
      this.title,
      this.note_text
    ];
    this.note_picture = document.getElementById("content-imgs");
    this.upload_picture_inputs = document.querySelectorAll("nav input, input[name=pictureUpload]");
    this.listen_icon = document.getElementById('listen-icon');
    this.speech_icon = document.getElementById('speech-icon');
    this.customize_icon = document.getElementById('show-tools');
    this.styling_box = document.getElementById('tools');
    this.text_color_input = document.querySelector('[title=Text] [type=color]'); 
    this.font_family_select = document.querySelector("[title] [name=Fonts]");
    this.font_size_input = document.querySelector("[title] [type=range]");
    this.text_align_select = document.querySelector('[title] [name=Aligns');
    this.font_style_checkbox = document.querySelector("[title] [name=Style]");
    this.font_variant_checkbox = document.querySelector("[title] [name=Variant]");
    this.font_weight_checkbox = document.querySelector("[title] [name=Weight]");
    this.text_shadow_checkbox = document.querySelector("[title] [name=Shadow]");
    this.background_images = document.querySelectorAll("[title=view] div.background-imgs img");
    this.upload_background_img_input = document.querySelector("[title=view] [type=file]");
    this.uploaded_background_picture_container = document.getElementById("upload-imgs");
    this.background_color_input = document.querySelector('[title=view] input[type=color]');
    this.light_mode_box = document.querySelector("input[name=light-mode]");
    this.put_date = document.getElementById('input-date');
    this.noteInfButton = this.document.getElementById('file-inf');
    this.saveButton = document.querySelectorAll('#save, #saveButton');
    this.printButton = this.document.getElementById('print');
    this.printAsImgButton = document.getElementById('print-as-img');
    this.saveAsTextFileButton = document.getElementById('save-as-txt');
    this.saveAsAudioFileButton = document.getElementById('save-as-audio');
    this.deleteButton = document.getElementById('delete');
    this.exitButton = this.document.getElementById('quit');
    this.listen_note;
  }
  firstEvents() {
    this.note_inputs.forEach(el => el.addEventListener('input', (event) => {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  }));
  this.styling_box.addEventListener('click', (e) => e.stopPropagation());
  window.addEventListener('click', () => this.styling_box.hidden = 'hidden');
  function show_settings(event) {
  let nav = document.getElementById('navs').children;
  let text_setting = document.querySelector('div[title=Text]');
  let view_setting = document.querySelector('div[title=view]');
  let file_setting = document.querySelector('div[title=file]');
  switch(event.target.innerText) {
    case 'Text' :
      text_setting.style.display = "grid";
      nav[0].style.borderBottom = 'thin solid white';
      [nav[1], nav[2]].forEach(n => n.style.border = 'none');
        [view_setting, file_setting].forEach(element => element.style.display = "none");
      break;
    case 'View' :
      view_setting.style.display = "block";
      nav[1].style.borderBottom = 'thin solid white';
      [nav[0], nav[2]].forEach(n => n.style.border = 'none');
      [text_setting, file_setting].forEach(element => element.style.display = "none");
      break;
    case 'File' :
      file_setting.style.display = "block";
      nav[2].style.borderBottom = 'thin solid white';
      [nav[0], nav[1]].forEach(n => n.style.border = 'none');
      [view_setting, text_setting].forEach(element => element.style.display = "none");
  }
}
   document.querySelectorAll('#navs span').forEach(nav => nav.addEventListener('click', show_settings));
}
  savedPictures(note) {
    this.note_picture.innerHTML = '';
    for (let index = 0; index < note.pictures.length; index++) {
      let img = document.createElement('img');
      img.src = note.pictures[index];
      let div = document.createElement("div");
      let deleteButton = document.createElement('button');
      deleteButton.textContent = 'x';
      deleteButton.addEventListener('click', () => this.deletePicture(note, index));
      div.append(img, deleteButton);
      this.note_picture.appendChild(div);
    };
   this.uploadBackgroundPicture(note);
  }
  deletePicture(note, index) {
    if (index >= 0 && index < note.pictures.length) {
       note.pictures.splice(index, 1);
    }
    this.savedPictures(note);
  }
  update(note) {
    this.date.textContent = note.date;
    this.title.style.height = note.background_styles.titleHeight + 'px';
    this.note_text.style.height = note.background_styles.textHeight + 'px';
    this.note_inputs.forEach(input => {
      input.style.color = this.text_color_input.value;
      input.style.fontFamily = this.font_family_select.value;
      input.style.fontSize = this.font_size_input.value + "px";
      input.style.textAlign = this.text_align_select.value;
      input.style.fontStyle = this.font_style_checkbox.value;
      input.style.fontVariant = this.font_variant_checkbox.value;
      input.style.fontWeight = this.font_weight_checkbox.value;
      input.style.textShadow = this.text_shadow_checkbox.value;
    });
    this.note_background.style.backgroundImage = "url(" + note.background_styles.image + ")";
    this.note_background.style.backgroundColor = this.background_color_input.value;
    this.savedPictures(note);
  }
  uploadBackgroundPicture(note) {
    this.uploaded_background_picture_container.innerHTML = '';
    if (note.background_styles.image != '') {
       let img = document.createElement('img');
       img.src = note.background_styles.image;
       note.background_styles.image = img.src;
       let div = document.createElement("div");
       div.appendChild(img);
       img.addEventListener('click', () => { 
         note.background_styles.image = img.src;
         this.update(note);
       });
      div.addEventListener('dblclick', () => {
        note.background_styles.image = '';
        this.update(note);
        this.uploadBackgroundPicture(note);
      });
      this.uploaded_background_picture_container.appendChild(div);
    }
  }
}