








var scene,camera,renderer,controls,mesh;
var angularSpeed=0.2;
var lastTime=0;
init();
animate();
function init(){
	scene=new THREE.Scene();
	camera=new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,1,10000);
	camera.position.z=500;
	scene.add(camera);
	renderer=new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth,window.innerHeight);
	container=document.getElementById('ThreeJS');
	container.appendChild(renderer.domElement);
	controls=new THREE.OrbitControls(camera);
	var light=new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
	var canvas=document.createElement('canvas');
	canvas.width=400;
	canvas.height=400;
	var ctx=canvas.getContext('2d');
	var texture=new THREE.Texture(canvas);
	var img=new Image();
	img.src="tartan.jpg";
	img.onload=function(){
		ctx.drawImage(img,0,0,canvas.width,canvas.height);
		var input=ctx.getImageData(0,0,canvas.width,canvas.height);
		var inputData=input.data;
		var w=canvas.width,h=canvas.height;
		ctx.putImageData(input,0,0);
		function copyLoop(){
			var copy=ctx.getImageData(0,0,canvas.width,canvas.height);
			var copyData=copy.data;
			for(var y=0;y<h;y++){for(var x=0;x<w;x++){
				var pixel=(y*w+x)*4;var red=pixel;
				var green=pixel+1;var blue=pixel+2;
				if(copyData[pixel-w*4]>copyData[pixel]){
					swap(copyData,red,red-4*w-4,green,green-4*w-4,blue,blue-4*w-4);
				}
			}
		}
	ctx.putImageData(copy,0,0);
	if(texture)texture.needsUpdate=true;
		texture.magFilter=THREE.NearestFilter;
	}
	setInterval(
		function(){
			copyLoop();
		},
		30);
	};
material=new THREE.MeshBasicMaterial({map:texture,side:THREE.FrontSide});
material.transparent=true;
mesh=new THREE.Mesh(new THREE.CubeGeometry(200,200,200),material);
mesh.position.set(0,0,0);scene.add(mesh);
}
function animate(){
	var time=(new Date()).getTime();
	var timeDiff=time-lastTime;
	var angleChange=angularSpeed*timeDiff*2*Math.PI/6000;
	mesh.rotation.x+=angleChange;
	mesh.rotation.y+=angleChange;
	lastTime=time;
	requestAnimationFrame(animate);
	render();
	update();
}
function update(){
	controls.update();
}
function render(){
	renderer.render(scene,camera);

}
function swap(x,rl,rr,gl,gr,bl,br){
	var tempr=x[rl];
	x[rl]=x[rr];
	x[rr]=tempr;
	var tempg=x[gl];
	x[gl]=x[gr];
	x[gr]=tempg;
	var tempb=x[bl];
	x[bl]=x[br];
	x[br]=tempb;
}











