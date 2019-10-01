 
// Programmed by Jarod Lewins 
// 09/28/2019
// This file contains all the javascript functions needed to draw a grid and iterate an ant around the canvas

//Draws the grid our ant will move on
function draw_grid( rctx, rminor, rmajor, rstroke, rfill  ) 
{
    rctx.save( );
    rctx.strokeStyle = rstroke;
    rctx.fillStyle = rfill;
    let width = rctx.canvas.width;
    let height = rctx.canvas.height;
    for ( var ix = 0; ix < width; ix += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( ix, 0 );
        rctx.lineTo( ix, height );
        rctx.lineWidth = ( ix % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
    }
    for ( var iy = 0; iy < height; iy += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( 0, iy );
        rctx.lineTo( width, iy );
        rctx.lineWidth = ( iy % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
    }
    rctx.restore( );
}

//constructor for Ant object
function Ant(orientation, x, y){
	this.orientation = orientation;
	this.state;
	this.colors = ["black", "magenta", "yellow", "cyan"];
	this.x = x;
	this.y = y;
}

//draws the ant in its current orientation, at its current coordinates
function drawAnt(ctx, ant)
{

	ctx.save( );
	ctx.beginPath( );
	ctx.strokeStyle = 'white';
	ctx.fillStyle = 'white';
	switch(ant.orientation)
	{
		case 0://North
		{
			ctx.moveTo(ant.x + 5, ant.y + 5);
			ctx.lineTo(ant.x, ant.y - 5);
			ctx.lineTo(ant.x - 5, ant.y + 5);
			ctx.lineTo(ant.x + 5, ant.y + 5);
			break;
		}
		
		case 1: //East
		{
			ctx.moveTo(ant.x - 5, ant.y - 5);
			ctx.lineTo(ant.x + 5, ant.y);
			ctx.lineTo(ant.x - 5, ant.y + 5);
			ctx.lineTo(ant.x - 5, ant.y - 5);
			break;
		}
		
		case 2: //South
		{

			ctx.moveTo(ant.x - 5, ant.y - 5);
			ctx.lineTo(ant.x, ant.y + 5);
			ctx.lineTo(ant.x + 5, ant.y - 5);
			ctx.lineTo(ant.x - 5, ant.y - 5);
			break;
		}
		
		case 3: //West
		{
			ctx.moveTo(ant.x + 5, ant.y + 5);
			ctx.lineTo(ant.x - 5, ant.y);
			ctx.lineTo(ant.x + 5, ant.y - 5);
			ctx.lineTo(ant.x + 5, ant.y + 5);
			break;
		}
	}
	ctx.closePath( );
	ctx.fill( );
	ctx.stroke( );
	ctx.restore( );

}

//sets state of ant based on current tile color
function setState(ctx, ant)
{
	var colorpx = ctx.getImageData(ant.x-7, ant.y-7, 1, 1);
	var red = colorpx.data[0];
	var green = colorpx.data[1];
	var blue = colorpx.data[2];
	
	if(blue == 255 && red == 255)          //if on magenta, we change "state" to index of yellow; and turn right;
	{
		ant.state = 2;
		ant.orientation = ((ant.orientation + 1) % 4);
	}
	else if(green == 255 && red == 255)   //if on yellow, move to index of cyan; turn left;
	{
		ant.state = 3;
		if(ant.orientation > 0)
			ant.orientation = ((ant.orientation - 1) % 4); //turns out javascript's modulo isn't really right, we need to check for negatives so we dont hurt JS's feelings
		else
			ant.orientation = 3;
	}
	else if(blue == 255 && green == 255)    //cyan to black; left;
	{
		ant.state = 0;
		if(ant.orientation > 0)
			ant.orientation = ((ant.orientation - 1) % 4); 
		else
			ant.orientation = 3;
	}
	else                                   //black to magenta; right;
	{
		ant.state = 1; 
		console.log(ant.state);
		ant.orientation = ((ant.orientation + 1) % 4);
	}
}

//fills current square with color, beautiful color
function fillSquare(ctx, ant)
{
	ctx.save( );
	
	ctx.fillStyle = ant.colors[ant.state];            //next color in sequence, color array index is offset by one to make this bit of code prettier
	ctx.fillRect(ant.x-9, ant.y-9, 18, 18);      //fills in a square on grid, with space for the actual grid lines
	
	ctx.restore( );
}

//makes ant move in direction of orientation
function move(ctx, ant)
{
	switch(ant.orientation)
	{
		case 0:           //North, decrease Y because the coordinate planes system isn't hip enough for web devs
			ant.y -= 20;
			break;
		
		case 1:           //East
			ant.x += 20;
			break;
		
		case 2:           //South
			ant.y += 20;
			break;
			
		case 3:           //West
			ant.x -= 20;
			break;
	}
}

//Delay function so we can see our ant progress
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//Primary function for iterating langton's ant, moves the ant "iterations" times via loop
async function iterate(ctx, ant, iterations)
{
	for(i = 0; i < iterations; i++)
	{

		setState(ctx, ant);
		fillSquare(ctx, ant);
		move(ctx, ant);
		drawAnt(ctx, ant);
		await sleep(5); //delay by 5 ms
	}
}


