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
        // this.#radius=60;
        // this.#lineWidth=6;
        this.#radius = canvas.width * 0.06; 
        this.#lineWidth = canvas.width * 0.007; 
        this.#centerX = Math.floor(Math.random() * (canvasWidth - 2 * this.#radius)) + this.#radius;
        this.#centerY = Math.floor(Math.random() * (canvasHeight - 2 * this.#radius)) + this.#radius;
    
        this.#strokeColor=generateUniqueRandomColor();
    }

    drawCircle(ctx)
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

    drawCircleIsPossible(x,y)
    {
        if (x- this.#radius >= 0 && 
            x + this.#radius <= canvas.width &&
            y - this.#radius >= 0 && 
            y + this.#radius <= canvas.height) {
                return true;
            }

        return false;
    }

    getCircleCenterCoordinateX()
    {
        return this.#centerX; 
    }

    getCircleCenterCoordinateY()
    {
        return this.#centerY; 
    }

    getRadius()
    {
        return this.#radius;
    }

    setCircleCenter(x,y)
    {
        if(this.drawCircleIsPossible(x,y))
        {
            this.#centerX = x;
            this.#centerY = y;
        }
    }
}

export {Circle};