export class Canvas {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

convert(note) {
    // Calculate canvas dimensions based on content size
    const titleWidth = this.getTextWidth(note.title, note.text_styles);
    const textWidth = this.getWrappedTextWidth(note.text, note.text_styles);
    const maxWidth = Math.max(titleWidth, textWidth);
    const imageWidth = note.pictures.length > 0 ?
        note.pictures.reduce((max, image) => Math.max(max, image.width), 0) : 0;
    const width = Math.max(maxWidth, imageWidth) + 20; // Add some padding
    let height = 200; // Adjust this as needed, depends on text and images

    // Adjust height based on number of lines
    const lines = note.text.split("\n").length;
    height += lines * 20; // Adjust font size and line spacing as needed

    this.canvas.width = width;
    this.canvas.height = height;

    // Set background color
    this.ctx.fillStyle = note.background_styles.color;
    this.ctx.fillRect(0, 0, width, height);

    // Draw title
    this.drawText(note.title, 10, 30, note.text_styles);

    // Draw text with line breaks
    let y = 60;
    for (const line of note.text.split("\n")) {
        this.drawText(line, 10, y, note.text_styles);
        y += 20; // Adjust line spacing as needed
    }

    // Load images and draw them
    let x = 10;
    let imagesLoaded = 0;
    for (const image of note.pictures) {
        const photo = new Image();
        photo.onload = () => {
            this.ctx.drawImage(photo, x, 100, image.width, image.height);
            x += image.width + 10; // Adjust image spacing as needed
            imagesLoaded++;
            // Check if all images have finished loading
            if (imagesLoaded === note.pictures.length) {
                // All images loaded, trigger download
                this.downloadImage();
            }
        };
        photo.src = image;
    }

    return this.canvas;
}

downloadImage() {
    // Trigger download action
    const image = this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const link = document.createElement('a');
    link.download = 'note_image.png';
    link.href = image;
    link.click();
}


  // ... existing drawText and getTextWidth methods ...
  drawText(text, x, y, styles) {
    this.ctx.fillStyle = styles.color;
    this.ctx.font = `${styles.fontStyle} ${styles.fontVariant} ${styles.fontWeight} ${styles.fontSize}px ${styles.fontFamily}`;
    this.ctx.textAlign = styles.textAlign;
    this.ctx.fillText(text, x, y);
  }
  
  getTextWidth(text, styles) {
    this.ctx.font = `${styles.fontStyle} ${styles.fontVariant} ${styles.fontWeight} ${styles.fontSize}px ${styles.fontFamily}`;
    return this.ctx.measureText(text).width;
  }
  getWrappedTextWidth(text, styles) {
    // This assumes a single-line canvas context
    this.ctx.font = `${styles.fontStyle} ${styles.fontVariant} ${styles.fontWeight} ${styles.fontSize}px ${styles.fontFamily}`;
    const words = text.split(" ");
    let lineWidth = 0;
    let maxWidth = 0;
    for (const word of words) {
      lineWidth += this.ctx.measureText(word).width;
      if (lineWidth > this.canvas.width) {
        maxWidth = Math.max(maxWidth, lineWidth);
        lineWidth = 0;
      }
    }
    return Math.max(maxWidth, lineWidth);
  }
}
