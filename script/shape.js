const shapeColorSet = new Set();

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

class Circle
{
    #radius;
    #lineWidth;
    #strokeColor;
    #centerX;
    #centerY;

    constructor(canvasWidth,canvasHeight)
    {
        this.#radius = canvas.width * 0.06; 
        this.#lineWidth = canvas.width * 0.007; 
        this.#centerX = Math.floor(Math.random() * (canvasWidth - 2 * this.#radius)) + this.#radius;
        this.#centerY = Math.floor(Math.random() * (canvasHeight - 2 * this.#radius)) + this.#radius;
    
        this.#strokeColor=generateUniqueRandomColor();
    }

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
    }

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

    getCoordinateX()
    {
        return this.#centerX; 
    }

    getCoordinateY()
    {
        return this.#centerY; 
    }

    setShapeCoordinate(x,y)
    {
        if(this.isCirclePossible(x,y))
        {
            this.#centerX = x;
            this.#centerY = y;
        }
    }

    isShapeSelected(pointerX,pointerY)
    {
        const distance = Math.sqrt(Math.pow(pointerX - this.#centerX, 2) + Math.pow(pointerY - this.#centerY, 2));

        if(distance <= this.#radius)
        {
            return true;
        }

        return false;
    }
}

class Square
{
    #x;
    #y;
    #size;
    #lineWidth;
    #strokeColor;
    #canvasWidth;
    #canvasHeigth;

    constructor(canvasWidth,canvasHeight)
    {
        this.#size = canvas.width * 0.1; 
        this.#lineWidth = canvas.width * 0.007; 
        this.#canvasWidth=canvasWidth;
        this.#canvasHeigth = canvasHeight;
        this.#x = Math.floor(Math.random() * (canvasWidth - this.#size)); 
        this.#y = Math.floor(Math.random() * (canvasHeight - this.#size));
        this.#strokeColor=generateUniqueRandomColor();
    }

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
    }

    isShapeSelected(pointerX,pointerY)
    {
        return pointerX >= this.#x && pointerX <= this.#x + this.#size &&
        pointerY >= this.#y && pointerY <= this.#y + this.#size;

    }

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

    setShapeCoordinate(x,y)
    {
        if(this.isSquarePossible(x,y))
        {
            this.#x = x;
            this.#y = y;
        }
    }
    
    getCoordinateX()
    {
        return this.#x; 
    }

    getCoordinateY()
    {
        return this.#y; 
    }

}

export {Circle,Square};