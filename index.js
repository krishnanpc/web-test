//import * as tf from '@tensorflow/tfjs';
//import Tokenizer from './tokenizer';
//import { tokenizerFromJson } from './tokenizer';
//import { Series, DataFrame } from 'pandas-js';
//import * as tf from '@tensorflow/tfjs';

function preprocess(text)
{

    //let tokenizer = new Tokenizer();
   // tokenizer.fitOnTexts(text);

    //convert the image data to a tensor 
    let tensor = tf.fromPixels(img)
    //resize to 50 X 50
    const resized = tf.image.resizeBilinear(tensor, [50, 50]).toFloat()
    // Normalize the image 
    const offset = tf.scalar(255.0);
    const normalized = tf.scalar(1.0).sub(resized.div(offset));
    //We add a dimension to get a batch shape 
    const batched = normalized.expandDims(0)
    return batched

}


function prediction(text,a,model)

{
    //a = a

    a = tf.reshape(a, [1, 121])
    console.log("Hello world!");
    // Convert to lower case and remove all punctuations.
    const inputText =
        text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');
    // Convert the words to a sequence of word indices.
   // const sequence = inputText.map(word => {
     // let wordIndex = this.wordIndex[word] + this.indexFrom;
     // if (wordIndex > this.vocabularySize) {
     //   wordIndex = OOV_INDEX;
     // }
     // return wordIndex;
    //});
    // Perform truncation and padding.
    //const paddedSequence = padSequences([sequence], 121);
   // const input = tf.tensor2d(paddedSequence, [1, 121]);

   // const beginMs = performance.now();
    const predictOut = model.predict(a);
    //const score = predictOut.dataSync()[0];
    //predictOut.dispose();
    //const endMs = performance.now();
    console.log(predictOut.print())
    return {predictOut};
  }


// LSTM Predict function
async function start() {

//const ds = new Series([1, 2, 3, 4], {name: 'My test name', index: [2, 3, 4, 5]})
//ds.toString()






var a = tf.tensor([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 1 ,0 ,1 ,0 ,1 ,0 ,1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])


console.log("Start entered!");

const json = '{ "fruit": "pineapple", "fingers": 10 }';
const obj = JSON.parse(json);
console.log(obj.fruit, obj.fingers);

//var obj = JSON.parse('simple_json.json');
//console.log(obj)

//const model = tf.sequential();
 const model = await tf.loadLayersModel('model.json')
  // Use the model to do inference on a data point the model hasn't seen.
  // Should print approximately 39.

//var inputVal = document.getElementById("myInput").value;

console.log("Model Loaded");
console.log(model.summary());
     prediction("Munich",a,model);
}

start();