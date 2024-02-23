export class Model {
  constructor() { 
    this.title = "";
    this.text = "";
    this.date = new Date().toDateString();
    this.pictures = [];
    this.text_styles = {
        color : "#ffffff",
        fontFamily : "Arial",
        fontSize : "21",
        textAlign : "Left",
        fontStyle : "",
        fontVariant : "",
        fontWeight : "",
        textShadow : ""
    };
    this.background_styles = {
        image : "",
        color : "#333333",
        lightMode : '',
        titleHeight : '',
        textHeight : ''
    };
  }
}