//import tf from tensorflow.js
const tf =  require("@tensorflow/tfjs-node");
const fs = require('fs');
const path = require('path');
const ll = require('canvas')
const sharp = require('sharp');
const { IncomingMessage } = require("http");

async function run(){

    const model = await tf.loadLayersModel('file://tfjs_model/model.json')

    //挿入したのはこれのみ
    const imagePath = 'image_enchuu1_fixed.jpeg'
    const buffer = fs.readFileSync(imagePath);
    const { data, info } = await sharp(buffer)
        .raw()
        .toBuffer({ resolveWithObject: true });
    const tensor = tf.tensor3d(data, [info.height, info.width, info.channels]);
    //ここまで。あとは元のjsファイル通りにいける。

    
    console.log(tensor.shape)

    const resizedImage = tf.image.resizeBilinear(tensor, [200, 200])
    console.log(resizedImage.shape)


    const expandedImage = resizedImage.expandDims(0);//次元追加1
    console.log(expandedImage.shape)

    const re = model.predict(expandedImage)//予測関数
    console.log(re)
    const result = re.argMax(1).dataSync()[0];//わからない？
    console.log(result)
    var n = 0

    if (result == 1){
      n = "ノート型ですよ"
    } else if (result == 0){
      n = "円柱型ですよ"
    } else if (result == 2){
      n = "ペン型ですよ"
    } else if (result == 3){
      n = "直方体ですよ"
    }

    console.log(n)
}

run();