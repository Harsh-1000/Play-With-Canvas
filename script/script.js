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

/**
 * imgLink to store the image url for the canvas background
 */
var imgLink = null;
/**
 * shapes array to store the shape objects 
 */
var shapes = [];
/**
 * to store the selected shape object
 */
var selectedShape = null;

/**
 * to add the event listner keydown to the selected shape
 */
var moveListner = null;

/**
 * Event listener for the image file input change event.
 */
imageFile.addEventListener('change',selectImage);

/**
 * Event listener to drag the image file to the dropArea
 */
dropArea.addEventListener('dragover', (event) =>
{
    event.preventDefault(); 
})

/**
 * Event listener to drop the image file to the dropArea
 * It calls the function selectImage
 */
dropArea.addEventListener('drop',(event)=>
{
    event.preventDefault();
    imageFile.files = event.dataTransfer.files;
    selectImage();
})

/**
 * Event listener to initialize canvas with pploaded image on event click 
 */
uploadImage.addEventListener('click',initializeCanvasWithUploadedImage)

/**
 * Event listener to reset the selected image on event click
 */
imageForCanvas.addEventListener('click',newImage);

/**
 * Event listener to the draw the circle on the canvas on click event
 */
drawCircle.addEventListener('click',drawCircleOnCanvas);

/**
 * Event listener to the draw the square on the canvas on click event
 */
drawSquare.addEventListener('click',drawSquareOnCanvas);

/**
 * Event listener to get mouse pointer coordinate on click event
 */
canvas.addEventListener('click',getPointerCoordinate);

/**
 * Event listener to clear the canvas screen on click event
 */
clearCanvasArea.addEventListener('click',clearCanvas);

/**
 * Event listener to reset the page state on click event
 */
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

/**
 * selectImage to get the input image url and set in the selected image src
 */
function selectImage()
{
    imgLink = URL.createObjectURL(imageFile.files[0]);
    selectedImg.src = imgLink;
}

/**
 * clearCanva - to clear the canvas
*/
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
}

/**
 *  @param {MouseEvent} event - the mouse event that triggered this function. 
 *  it contains information about the mouse position (clientX, clientY).
 *  and check it wether it lie with in any shape or not
 */
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

/**
 * Initializes the canvas by displaying the appropriate sections and loading an image onto the canvas.
 * This function hides the upload section, displays the canvas section, and resizes the canvas to 
 * match its container's dimensions. If no image link is provided, it loads a default image onto the canvas.
 */
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

/**
 * this function clears the canvas and empty the shapes array and 
 * hide the canvas section and display the image upload section
 */
function newImage()
{
    clearCanvas();
    shapes=[];
    imgLink=null;
    canvasSection.style.display='none';
    uploadSection.style.display='block';
}

/**
 * 
 * @param {*} imageSource - get the image url to be set in the canvas section background
 * this function set the canvas section background
 */
function drawImage(imageSource)
{
    canvasImg.style.backgroundImage = `url(${imageSource})`;
    canvasImg.style.backgroundPosition = "center";
    canvasImg.style.backgroundRepeat = "repeat";
    canvasImg.style.backgroundSize = "cover";
}

/**
 * to draw circle on the canvas
 */
function drawCircleOnCanvas()
{
    const circleShape = new Circle(canvas.width,canvas.height);
    shapes.push(circleShape);
    circleShape.drawShape(ctx);
}

/**
 * to draw square on the canvas
 */
function drawSquareOnCanvas()
{
    const squareShape = new Square(canvas.width,canvas.height);
    shapes.push(squareShape);
    squareShape.drawShape(ctx);
}

/**
 * Enables movement for the currently selected shape by attaching a keyboard event listener.
 * This function removes any existing `keydown` event listener, adds a new one, and moves the 
 * selected shape based on the user's keyboard input.
 *
 * The movement of the shape is handled by the `moveShape` function, which is called whenever 
 * the user presses a key. If no shape is selected, the event listener does nothing.
 */
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

/**
 * 
 * @param {*} event 
 * @param {*} shape 
 * Moves the given shape based on the user's keyboard input.
 */
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

/**
 * it clear the canvas screen redraw shapes on the canvas
 */
function redrawShapes() {
    clearCanvas();
    drawShapesOnCanvas();
}

/**
 * it draw the shapes on the canvas using shapes array
 */
function drawShapesOnCanvas() {
    shapes.forEach(shape =>{
        shape.drawShape(ctx);
    })

}