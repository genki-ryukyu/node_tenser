document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
  
    const imageSet1 = urlParams.get('myImages1');
    const imageSet2 = urlParams.get('myImages2');
    const imageSet3 = urlParams.get('myImages3');
  
    if (imageSet1 && imageSet2 && imageSet3) {
      processImageSet(imageSet1, 1);
      processImageSet(imageSet2, 2);
      processImageSet(imageSet3, 3);
    } else {
      console.error('Image sets not provided.');
    }
  });
  
  function processImageSet(imageSet, index) {
    const imageBase64Array = imageSet.split(",");
    
    imageBase64Array.forEach((imageBase64, i) => {
      const imageElement = new Image();
      imageElement.src = "data:image/jpeg;base64," + imageBase64;
  
      // ここで取得した imageElement を表示などの処理に利用する
      document.body.appendChild(imageElement);
      
      // 各画像に対する処理を追加
      console.log(`Image ${index}-${i + 1}:`, imageElement);
    });
  }


