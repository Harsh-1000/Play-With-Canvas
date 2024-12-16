import { Circle, Square } from "./shape.js";

const dropArea = document.getElementById('drop-area');
const imageFile = document.getElementById('input-image');
const selectedImg = document.getElementById('view-img');
const uploadSection = document.getElementById('upload-section');
const canvasSection = document.getElementById('canvas-section');
const uploadImage = document.getElementById('upload-btn');
const imageForCanvas = document.getElementById('image-for-canvas');
const drawCircle = document.getElementById('draw-circle');
const drawSquare = document.getElementById('draw-square');
const canvasImg = document.getElementById('canvas-img');
const clearCanvasArea = document.getElementById('clear-canvas');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var imgLink = null;
var shapes = [];
var selectedShape = null;
var moveListner = null;


imageFile.addEventListener('change',selectImage);

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

drawSquare.addEventListener('click',drawSquareOnCanvas);

canvas.addEventListener('click',getPointerCoordinate);

clearCanvasArea.addEventListener('click',clearCanvas);

window.addEventListener('resize', () =>
    {
        if(imgLink!==null)
        {   
            clearCanvas();
            shapes = [];
            canvas.width=0;
            canvas.height=0;
            initializeCanvasWithUploadedImage();
        }

    });

function selectImage()
{
    imgLink = URL.createObjectURL(imageFile.files[0]);
    selectedImg.src = imgLink;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
}

function getPointerCoordinate(event)
{
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    for(let i = shapes.length-1;i>=0;i--)
    {
        let shape = shapes[i];
        console.log(shape);
        console.log(`Canvas Width: ${canvas.width}, Canvas Height: ${canvas.height}`);
        console.log(`Mouse Clicked at: x = ${x}, y = ${y}`);
        if (shape.isShapeSelected(x,y)) {
            shapes.splice(i,1);
            shapes.push(shape);
            selectedShape = shape;
            enableShapeMovement(); 
            break;
        } else {
            selectedShape=null;
        }
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
    if(imgLink===null)
    {
        imgLink = './img/default.jpg';
    }
    drawImage(imgLink);

}

function newImage()
{
    clearCanvas();
    shapes=[];
    imgLink=null;
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
    circleShape.drawShape(ctx);
}

function drawSquareOnCanvas()
{
    const squareShape = new Square(canvas.width,canvas.height);
    shapes.push(squareShape);
    squareShape.drawShape(ctx);
}

function enableShapeMovement() {

    window.removeEventListener('keydown',moveListner);

    moveListner = (event) =>
        {
            if (selectedShape) { 
                moveShape(event,selectedShape);
            }
           
        }
    window.addEventListener('keydown',moveListner);
}

function moveShape(event,shape) {

    console.log('key pressed');
    let centerX = shape.getCoordinateX();
    let centerY = shape.getCoordinateY();
    
    switch (event.key) {
        case 'ArrowUp':
            shape.setShapeCoordinate(centerX, centerY - 5); 
            break;
        case 'ArrowDown':
            shape.setShapeCoordinate(centerX, centerY + 5);
            break;
        case 'ArrowLeft':
            shape.setShapeCoordinate(centerX - 5, centerY); 
            break;
        case 'ArrowRight':
            shape.setShapeCoordinate(centerX + 5, centerY); 
            break;
        default:
            return; 
    }

    redrawShapes();
}

function redrawShapes() {
    clearCanvas();
    drawShapesOnCanvas();
}

function drawShapesOnCanvas() {
    shapes.forEach(shape =>{
        shape.drawShape(ctx);
    })

}
