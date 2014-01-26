var heapSort = (function(){

var canvas, ctx, width, height;

var imageData, imageDataWrapper;

var arr = [];

var n;
var left;
var right;
var largest;

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
	heapsort(imageData);
	console.log(imageData.length)
} 

function buildheap(arr){
	n = arr.length-1;
	for(i=n/2; i >= 0; i--){
		//if(i>200){
		maxheap(arr,i);
		//}
	}
}

function maxheap(arr, i){
		left=2*i;
        right=2*i+1;
        largest = i;
        if(left <= n && arr[left] > arr[i]){
            largest=left;
        }
        else{
            largest=i;
        }
        
        if(right <= n && arr[right] > arr[largest]){
            largest=right;
        }
        if(largest!=i){
            exchange(i,largest);
            maxheap(arr,largest);
        }
}

function exchange(i, j){
	t = arr[i];
	arr[i] = arr[j];
	arr[j] = t;

}

function heapsort(_arr){
	var arr = _arr;
	buildheap(arr);

	for (i = n; i > 0; i--) {
		exchange(0,i);
		n=n-1;
		maxheap(arr, 0);
		
	}
}

  return init;

})();