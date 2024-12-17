/**
 * use to store unique color code
 */
const shapeColorSet = new Set();
var removeImg ='./img/death.png';
/**
 * it generate and return the unique color code
 * @returns color code
 */
function generateUniqueRandomColor() {
  let color;
  do {
    color = `rgb(${Math.floor(Math.random() * 256)}, 
                 ${Math.floor(Math.random() * 256)}, 
                 ${Math.floor(Math.random() * 256)})`;
  } while (shapeColorSet.has(color));  

  shapeColorSet.add(color);  
  return color;  
}

/**
 * Represents a circle shape that can be drawn on a canvas.
 */
class Circle
{
    #radius;
    #lineWidth;
    #strokeColor;
    #centerX;
    #centerY;
    isRemove;
 
    /**
     * Creates a new Circle object with random position and predefined size and stroke.
     * 
     * @param {number} canvasWidth - The width of the canvas where the circle will be drawn.
     * @param {number} canvasHeight - The height of the canvas where the circle will be drawn.
     */
    constructor(canvasWidth,canvasHeight)
    {
        this.#radius = canvas.width * 0.06; 
        this.#lineWidth = canvas.width * 0.007; 
        this.#centerX = Math.floor(Math.random() * (canvasWidth - 2 * this.#radius)) + this.#radius;
        this.#centerY = Math.floor(Math.random() * (canvasHeight - 2 * this.#radius)) + this.#radius;
        this.isRemove = false;
        this.#strokeColor=generateUniqueRandomColor();
    }

     /**
     * Draws the circle on the given canvas context.
     * The circle is filled with a semi-transparent white color and has a defined stroke color and width.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context on which to draw the circle.
     */
    
    drawShape(ctx)
    {
        ctx.beginPath();
        console.log("x = " + this.#centerX + "   y = " +   this.#centerY );
        ctx.arc(this.#centerX,this.#centerY,this.#radius,0,2*Math.PI);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';  
        ctx.fill();
        ctx.strokeStyle = this.#strokeColor;
        ctx.lineWidth = this.#lineWidth;
        ctx.stroke();
        if(this.isRemove) {
            this.drawImage(ctx);
        }
    }

     /**
     * to draw the image on the shape
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context on which to draw the image.
     */
    drawImage(ctx)
    {
        const image = new Image();
        image.src = removeImg;
        const imgWidth = this.#radius * 1.2;  
        const imgHeight = this.#radius * 1.2; 
        console.log(image);
        ctx.drawImage(image, this.#centerX - imgWidth / 2, this.#centerY - imgHeight / 2, imgWidth, imgHeight);
    }

     /**
     * Checks wether the circle is within the canvas or not
     * 
     * @param {number} x - The x-coordinate of the point to check.
     * @param {number} y - The y-coordinate of the point to check.
     * @returns {boolean} - Returns `true` if the circle is inside the canvas, `false` otherwise.
     */
    isCirclePossible(x,y)
    {
        if (x- this.#radius >= 0 && 
            x + this.#radius <= canvas.width &&
            y - this.#radius >= 0 && 
            y + this.#radius <= canvas.height) {
                return true;
            }

        return false;
    }

    /**
     * Gets the x-coordinate of the circle's center.
     * 
     * @returns {number} - The x-coordinate of the circle's center.
     */
    getCoordinateX()
    {
        return this.#centerX; 
    }

    /**
     * Gets the y-coordinate of the circle's center.
     * 
     * @returns {number} - The y-coordinate of the circle's center.
     */
    getCoordinateY()
    {
        return this.#centerY; 
    }

    /**
     * Sets the circle's center to new coordinates (x, y), if the new coordinates are valid.
     * 
     * @param {number} x - The new x-coordinate for the circle's center.
     * @param {number} y - The new y-coordinate for the circle's center.
     */
    setShapeCoordinate(x,y)
    {
        if(this.isCirclePossible(x,y))
        {
            this.#centerX = x;
            this.#centerY = y;
        }
    }

     /**
     * Checks if the shape is selected based on a given pointer (mouse) position.
     * 
     * @param {number} pointerX - The x-coordinate of the pointer (mouse) position.
     * @param {number} pointerY - The y-coordinate of the pointer (mouse) position.
     * @returns {boolean} - Returns `true` if the pointer is inside the circle, `false` otherwise.
     */
    isShapeSelected(pointerX,pointerY,ctx)
    {
        const distance = Math.sqrt(Math.pow(pointerX - this.#centerX, 2) + Math.pow(pointerY - this.#centerY, 2));

        if(distance <= this.#radius)
        {
            return true;
        }

        return false;
    }
}

/**
 * Represents a square shape that can be drawn on a canvas.
 */
class Square
{
    #x;
    #y;
    #size;
    #lineWidth;
    #strokeColor;
    #canvasWidth;
    #canvasHeigth;
    isRemove;

    /**
     * Creates a new Square object with random position and predefined size and stroke.
     * 
     * @param {number} canvasWidth - The width of the canvas where the square will be drawn.
     * @param {number} canvasHeight - The height of the canvas where the square will be drawn.
     */
    constructor(canvasWidth,canvasHeight)
    {
        this.#size = canvas.width * 0.1; 
        this.#lineWidth = canvas.width * 0.007; 
        this.#canvasWidth=canvasWidth;
        this.#canvasHeigth = canvasHeight;
        this.#x = Math.floor(Math.random() * (canvasWidth - this.#size)); 
        this.#y = Math.floor(Math.random() * (canvasHeight - this.#size));
        this.#strokeColor=generateUniqueRandomColor();
        this.isRemove = false;
    }

     /**
     * Draws the square on the given canvas context.
     * The square is filled with a semi-transparent white color and has a defined stroke color and width.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context on which to draw the square.
     */
    drawShape(ctx)
    {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'; 
        ctx.fillRect(this.#x, this.#y, this.#size, this.#size); 
    
        let gradient = ctx.createLinearGradient(this.#x, this.#y, this.#x + this.#size, this.#y + this.#size);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');  
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');  

        ctx.fillStyle = gradient;
        ctx.fillRect(this.#x, this.#y, this.#size, this.#size);
    
        ctx.strokeStyle = this.#strokeColor;  
        ctx.lineWidth = this.#lineWidth;  
        ctx.strokeRect(this.#x, this.#y, this.#size, this.#size);  

        if(this.isRemove) {
            this.drawImage(ctx);
        }
    }

    /**
     * to draw the image on the shape
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context on which to draw the image.
     */
    drawImage(ctx)
    {
        const image = new Image();
        image.src = removeImg;
        const imgWidth = this.#size/1.4;  
        const imgHeight = this.#size/1.4; 
        const imgX = this.#x + (this.#size - imgWidth) / 2;
        const imgY = this.#y + (this.#size - imgHeight) / 2;

        ctx.drawImage(image, imgX, imgY, imgWidth, imgHeight);
    }

     /**
     * Checks if the shape is selected based on a given pointer (mouse) position.
     * 
     * @param {number} pointerX - The x-coordinate of the pointer (mouse) position.
     * @param {number} pointerY - The y-coordinate of the pointer (mouse) position.
     * @returns {boolean} - Returns `true` if the pointer is inside the square, `false` otherwise.
     */

    isShapeSelected(pointerX,pointerY)
    {
        return pointerX >= this.#x && pointerX <= this.#x + this.#size &&
        pointerY >= this.#y && pointerY <= this.#y + this.#size;

    }

    /**
     * Checks wether the square is within the canvas or not
     * 
     * @param {number} x - The x-coordinate of the point to check.
     * @param {number} y - The y-coordinate of the point to check.
     * @returns {boolean} - Returns `true` if the square is inside the canvas, `false` otherwise.
     */
    isSquarePossible(x,y)
    {
        if (x >= 0 && 
            x + this.#size <= this.#canvasWidth && 
            y >= 0 && 
            y + this.#size <= this.#canvasHeigth) {
            return true;
        }
        return false;
    }

    
    /**
     * Sets the square new coordinates (x, y), if the new coordinates are valid.
     * 
     * @param {number} x - The new x-coordinate for the square.
     * @param {number} y - The new y-coordinate for the square.
     */
    setShapeCoordinate(x,y)
    {
        if(this.isSquarePossible(x,y))
        {
            this.#x = x;
            this.#y = y;
        }
    }
    
    /**
     * Gets the x-coordinate of the square.
     * 
     * @returns {number} - The x-coordinate of the square.
     */
    getCoordinateX()
    {
        return this.#x; 
    }

    /**
     * Gets the y-coordinate of the square.
     * 
     * @returns {number} - The y-coordinate of the square.
     */
    getCoordinateY()
    {
        return this.#y; 
    }

}

export {Circle,Square};