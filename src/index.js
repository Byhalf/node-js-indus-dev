export default class Pencil {
  // eslint-disable-next-line default-param-last
  constructor(durability = 50, length = 50, eraserDurability) {
    this.durability = durability;
    this.maxDurability = durability;
    this.length = length;
    this.eraserDurability = eraserDurability;
  }

  getPencilDurability() {
    return this.durability;
  }

  getPencilLength() {
    return this.length;
  }

  getEraserDurability() {
    return this.eraserDurability;
  }

  updatePencilDurability(character) {
    if (character !== ' ') {
      // eslint-disable-next-line no-unused-expressions
      character === character.toLowerCase() ? this.durability -= 1 : this.durability -= 2;
    }
  }

  updatePencilLength() {
    this.length -= 1;
  }

  writeOnPaper(paper, textToWrite) {
    let newPaper = paper;
    for (let i = 0; i < textToWrite.length; i += 1) {
      this.updatePencilDurability(textToWrite.charAt(i));
      if (this.durability >= 0) {
        newPaper += textToWrite.charAt(i);
      } else {
        newPaper += ' ';
      }
    }
    return newPaper;
  }

  sharpen() {
    if (this.length) {
      this.updatePencilLength();
      this.durability = this.maxDurability;
    }
  }

  erase(paper, text) {
    if (paper.lastIndexOf(text) < 0) {
      return undefined;
    }

    const charactersOnPaper = paper.split('');
    const indexOfWord = paper.lastIndexOf(text) + text.length - 1;

    for (let i = 0; i < text.length; i += 1) {
      if (charactersOnPaper[indexOfWord - i] !== ' ') {
        this.eraserDurability -= 1;
      }
      charactersOnPaper[indexOfWord - i] = ' ';
    }
    return charactersOnPaper.join('');
  }

  // eslint-disable-next-line class-methods-use-this
  edit(paper, textToAdd) {
    if (paper.lastIndexOf('  ') < 0) {
      return undefined;
    }

    const charactersOnPaper = paper.split('');
    const indexOfBlankSpace = paper.indexOf('  ') + 1;

    for (let i = 0; i < textToAdd.length; i += 1) {
      if (charactersOnPaper[indexOfBlankSpace + i] === ' ') {
        charactersOnPaper[indexOfBlankSpace + i] = textToAdd.charAt(i);
      } else {
        charactersOnPaper[indexOfBlankSpace + i] = '@';
      }
    }

    return charactersOnPaper.join('');
  }
}
