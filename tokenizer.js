// Public Domain CC0 license. https://creativecommons.org/publicdomain/zero/1.0/
class Tokenizer {
  constructor(config = {}) {
    this.filters = config.filters || /[\\.,/#!$%^&*;:{}=\-_`~()]/g;
    this.lower = typeof config.lower === 'undefined' ? true : config.lower;

    // Primary indexing methods. Word to index and index to word.
    this.wordIndex = {};
    this.indexWord = {};

    // Keeping track of word counts
    this.wordCounts = {};
  }

  cleanText(text) {
    if (this.lower) text = text.toLowerCase();
    return text
      .replace(this.filters, '')
      .replace(/\s{2,}/g, ' ')
      .split(' ');
  }

  fitOnTexts(texts) {
    texts.forEach(text => {
      text = this.cleanText(text);
      text.forEach(word => {
        this.wordCounts[word] = (this.wordCounts[word] || 0) + 1;
      });
    });

    Object.entries(this.wordCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([word, number], i) => {
        this.wordIndex[word] = i + 1;
        this.indexWord[i + 1] = word;
      });
  }

  textsToSequences(texts) {
    return texts.map(text => this.cleanText(text).map(word => this.wordIndex[word] || 0));
  }

  toJson() {
    return JSON.stringify({
      wordIndex: this.wordIndex,
      indexWord: this.indexWord,
      wordCounts: this.wordCounts
    })
  }
}

export const tokenizerFromJson = json_string => {
  const tokenizer = new Tokenizer();
  const js = JSON.parse(json_string);
  tokenizer.wordIndex = js.wordIndex;
  tokenizer.indexWord = js.indexWord;
  tokenizer.wordCounts = js.wordCounts;
  return tokenizer;
};

export default Tokenizer;