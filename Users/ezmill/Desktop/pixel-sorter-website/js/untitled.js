var liner = (function(){

var spacer = 10;

var saved = false;

var canvas, ctx, width, height;

var imageData, imageDataWrapper;

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
   ctx.fillStyle = "white";
   ctx.fill();
   ctx.rect(0,0,width,height);

   imageDataWrapper = ctx.getImageData(0, 0, width, height);
   imageData = imageDataWrapper.data;

 }

function draw(){

 for (var y = 0; y < height; y+=spacer) {
   for(var x = 0; x < width; x+=spacer){
     var loc = (x + y*imageDataWrapper.width)*4;
     var brightness = getPixelBrightness(x,y); 
     var pixel = ctx.getImageData(x,y,1,1);
     var rgb = pixel.data;
      //console.log(brightness);
      console.log(rgb);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x+spacer, y+spacer);
      ctx.lineWidth = brightness/10;
      ctx.strokeStyle = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
      ctx.stroke();
     }
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

// this code was autogenerated from PJS
