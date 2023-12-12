// const { createRedirectInterceptor } = require("undici/types/interceptors");

// const { kArray } = require("opencv-nodejs");

// let imgElement = document.getElementById('imageSrc');
// let inputElement = document.getElementById('fileInput');

// let BLUR = 21
// let CANNY_THRESH_1 = 10
// let CANNY_THRESH_2 = 100
// let MASK_DILATE_ITER = 10
// let MASK_ERODE_ITER = 10

// let imgElement = document.getElementById('imageSrc');
// let inputElement = document.getElementById('fileInput');
// inputElement.addEventListener('change', (e) => {
//   imgElement.src = URL.createObjectURL(e.target.files[0]);
// }, false);




imgElement.onload = function() {
  
    let mat = cv.imread(imgElement);
    //let mat1 = cv.bitwise_not(mat)
    const grayscale = new cv.Mat();
    cv.cvtColor(mat, grayscale, cv.COLOR_BGR2GRAY);
    const edges = new cv.Mat();
    cv.Canny(grayscale, edges, 10, 100);
    const dilateKernel = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(3, 3));
    cv.dilate(edges, edges, new cv.Mat(), new cv.Point(-1, -1), 1);
    cv.erode(edges, edges, new cv.Mat(), new cv.Point(-1, -1), 1);
    const contours = new cv.MatVector();
    const hierarchy = new cv.Mat();
    cv.findContours(edges, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

    let maxArea = -1;
    let maxContourIdx = -1;
    for (let i = 0; i < contours.size(); ++i) {
      const area = cv.contourArea(contours.get(i));
      if (area > maxArea) {
        maxArea = area;
        maxContourIdx = i;
      }
    }

    const maxContour = new cv.MatVector();
    maxContour.push_back(contours.get(maxContourIdx));


    const mask = cv.Mat.zeros(edges.rows, edges.cols, cv.CV_8UC1);
    const maskColor = new cv.Scalar(255, 255, 255, 255);
    const maxContourArray = [];
    const contourData = maxContour.get(0).data32S; // 輪郭のデータ


    for (let i = 0; i < contourData.length; i += 2) {
      maxContourArray.push({ x: contourData[i], y: contourData[i + 1] });
    }
    const poly = new cv.MatVector();
    poly.push_back(new cv.Mat(maxContourArray.length, 1, cv.CV_32SC2));
    for (let i = 0; i < maxContourArray.length; ++i) {
      poly.get(0).data32S[i * 2] = maxContourArray[i].x;
      poly.get(0).data32S[i * 2 + 1] = maxContourArray[i].y;
    }

    cv.fillPoly(mask, poly, maskColor);
    
    // マスクの処理（膨張、収縮、ぼかし）
    let maskStack = mask.clone();
    cv.dilate(maskStack, maskStack, dilateKernel, new cv.Point(-1, -1), MASK_DILATE_ITER);
    cv.erode(maskStack, maskStack, dilateKernel, new cv.Point(-1, -1), MASK_ERODE_ITER);
    cv.GaussianBlur(maskStack, maskStack, new cv.Size(BLUR, BLUR), 0);

    let dst = mat.clone();
    let cardCnt = contours.get(maxContourIdx);
    let lineColor = new cv.Scalar(0, 0, 0, 255);
    let thickness = 9;
    // cv.drawContours(dst, contours, maxContourIdx, lineColor, thickness, cv.LINE_8);
    // cv.imshow('canvasOutput',dst);

    const boundingRect = cv.boundingRect(contours.get(maxContourIdx));
    const roi = dst.roi(boundingRect);
    const croppedMat = new cv.Mat();
    roi.copyTo(croppedMat);
    console.log(roi.cols, roi.rows);
    cv.imshow('canvasOutput',roi);

    

    

    let newSize = new cv.Size(157,100);//円柱だった場合のサイズ
    // 画像をリサイズ
    let dst2 = new cv.Mat();
    cv.resize(roi, dst2, newSize, 0, 0, cv.INTER_AREA); 
    cv.imshow('canvasOutput',dst2);

    let combined = new cv.Mat();
    let combinedCols = dst2.cols * 2;
    let combinedRows = dst2.rows;
    combined.create(combinedRows, combinedCols, dst.type());

    dst2.copyTo(combined.roi(new cv.Rect(0, 0, dst2.cols, dst2.rows)));
    dst2.copyTo(combined.roi(new cv.Rect(dst2.cols, 0, dst2.cols, dst2.rows)));




    let canvas = document.createElement('canvas');
    cv.imshow(canvas,combined);

    
    cv.imshow('canvasOutput',combined);
      
    // let dataURL = canvas.toDataURL('image/png');
    // ダウンロード用リンクを作成してクリックさせる
    // let link = document.createElement('a');
    // link.href = dataURL;
    // link.download = 'created_image.png'; // 保存する画像ファイルの名前
    // link.click();
  };

// var Module = {
//   onRuntimeInitialized() {
//     document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
//   }

// };
