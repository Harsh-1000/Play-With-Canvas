import { Circle } from "./shape.js";

const dropArea = document.getElementById('drop-area');
const imageFile = document.getElementById('input-image');
const selectedImg = document.getElementById('view-img');
const uploadSection = document.getElementById('upload-section');
const canvasSection = document.getElementById('canvas-section');
const uploadImage = document.getElementById('upload-btn');
const imageForCanvas = document.getElementById('image-for-canvas');
const drawCircle = document.getElementById('draw-circle');
const canvasImg = document.getElementById('canvas-img');


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

imageFile.addEventListener('change',selectImage);

var imgLink = null;
var shapes = [];

function selectImage()
{
    imgLink = URL.createObjectURL(imageFile.files[0]);
    selectedImg.src = imgLink;
}

dropArea.addEventListener('dragover', (event) =>
{
    event.preventDefault(); 
})

dropArea.addEventListener('drop',(event)=>
{
    event.preventDefault();
    imageFile.files = event.dataTransfer.files;
    selectImage();
})

uploadImage.addEventListener('click',initializeCanvasWithUploadedImage)

imageForCanvas.addEventListener('click',newImage);

drawCircle.addEventListener('click',drawCircleOnCanvas);

canvas.addEventListener('click',getPointerCoordinate);

window.addEventListener('resize', () =>
    {
        location.reload();
    });

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
}

function getPointerCoordinate(event)
{
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let shape = shapes[0];
    console.log(shape);
    console.log(`Canvas Width: ${canvas.width}, Canvas Height: ${canvas.height}`);
    let centerX = shape.getCircleCenterCoordinateX();
    let centerY = shape.getCircleCenterCoordinateY();
    let radius = shape.getRadius();
   
    console.log(`Mouse Clicked at: x = ${x}, y = ${y}`);

    
    const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));

    
    console.log(`Distance from center: ${distance}`);

    
    if (distance <= radius) {
        
        enableCircleMovement(); 
    } else {
        alert('Click is outside the circle!');
    }
}

function initializeCanvasWithUploadedImage()
{
    uploadSection.style.display='none';
    canvasSection.style.display='block';
    const canvasWidth = canvas.offsetWidth;
    const canvasHeight = canvas.offsetHeight;
    canvas.width = canvasWidth; 
    canvas.height = canvasHeight; 
    drawImage(imgLink);

}

function newImage()
{
    clearCanvas();
    shapes=[];
    canvasSection.style.display='none';
    uploadSection.style.display='block';
}

function drawImage(imageSource)
{
    canvasImg.style.backgroundImage = `url(${imageSource})`;
    canvasImg.style.backgroundPosition = "center";
    canvasImg.style.backgroundRepeat = "repeat";
    canvasImg.style.backgroundSize = "cover";
}


function drawCircleOnCanvas()
{
    const circleShape = new Circle(canvas.width,canvas.height);
    shapes.push(circleShape);
    circleShape.drawCircle(ctx);
}



function enableCircleMovement() {
    
    window.addEventListener('keydown',moveCircle);
}

function moveCircle(event,circle) {
   
    circle = shapes[0];
    console.log('key pressed');
    let centerX = circle.getCircleCenterCoordinateX();
    let centerY = circle.getCircleCenterCoordinateY();
    let radius = circle.getRadius();

    switch (event.key) {
        case 'ArrowUp':
            circle.setCircleCenter(centerX, centerY - 5); 
            break;
        case 'ArrowDown':
            circle.setCircleCenter(centerX, centerY + 5);
            break;
        case 'ArrowLeft':
            circle.setCircleCenter(centerX - 5, centerY); 
            break;
        case 'ArrowRight':
            circle.setCircleCenter(centerX + 5, centerY); 
            break;
        default:
            return; 
    }

    redrawShapes();
}

function redrawShapes() {
    clearCanvas();
    drawShapes();
}

function drawShapes() {
    
    let shape = shapes[0]; 
    shape.drawCircle(ctx,canvas.width,canvas.height); 
}