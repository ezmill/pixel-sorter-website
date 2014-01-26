var quicksort = (function(){

var canvas, ctx, width, height;

var imageData, imageDataWrapper;

var thresh = 125;

function init(img) {

    setup(img);
    draw();
    return canvas;
  }

function setup(img){
   canvas = document.createElement('canvas');
   width = canvas.width= img.naturalWidth;
   height = canvas.height=img.naturalHeight;

   ctx = canvas.getContext('2d');
   ctx.drawImage(img,0,0);
   // ctx.fillStyle = "white";
   // ctx.fill();
   // ctx.rect(0,0,width,height);

   imageDataWrapper = ctx.getImageData(0, 0, width, height);
   imageData = imageDataWrapper.data;

 }  

 function draw(){
console.log(imageData)

  for (var y = 0; y < height -1; y++) {
    for (var x = 0; x < width -1; x++) {
       var loc = x + (y*imageDataWrapper.width) * 4;
       //var pixel = ctx.getImageData(x,y,1,1);
      // var currColor = pixel.data;
      // var r = currColor[0];
      // var g = currColor[1];
//       var b = currColor[2];

       //var brightness = getPixelBrightness(x,y); 
       //hue function
       //sat function

       //if(briSort){
       // if(brightness>thresh){

      quicksort(imageData, loc, loc+1)

      console.log(imageData[loc]);
      console.log(imageData[loc+1])
       // }
       //}

     }; 
  };
  console.log(imageDataWrapper)
  ctx.putImageData(imageDataWrapper,0,0)

 }

 function partition(a,l,r){
  var i = l;
  var j = r;
  var temp;
  var pivot = a[(i+j)/2];
  while (i<=j) {
    while (a[i] < pivot) {
      i+=1;
    }
    while (a[j] > pivot) {
      j-=1;
    }
    if (i <= j) {
      temp = a[i];
      a[i] = a[j];
      a[j] = temp;
      i++;
      j--;
    }
  }
  return i;
 }

function quicksort(x,left,right){
  var index = partition(x, left, right);
  //console.log(index);
  if (left < index - 1){

    quicksort(x,left, index-1)
  }
  if ( index > right){
    quicksort(x,index,right);
  }
}


 function getPixelBrightness(x, y) {
    var offset = (x + y * width) * 4;
    var r = imageData[offset];
    var g = imageData[offset + 1];
    var b = imageData[offset + 2];
    // HSL - lightness:
    // return (Math.max(r,g,b) + Math.min(r,g,b)) / 2
    // HSV - value:
    return Math.max(r,g,b) / 255 * 100;
  }

return init;

})();