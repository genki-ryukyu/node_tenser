async function run(){
  const model = await tf.loadLayersModel('tfjs_model/model.json');
  const targetImg = document.getElementById('input_image');
  const tensor = tf.browser.fromPixels(targetImg);

  console.log(tensor.shape)
  const resizedImage = tf.image.resizeBilinear(tensor, [200, 200]);//次元調整{200, 200}
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

  alert(n)
}

run();