// size of the side of a square
// can be changed here manually or by using the slider
var sideSize = 100;

// holds all the pyramids visible on the screen
var pyramids = [];

// used to change color during the animation
var xCosCounter = 0;
var yCosCounter = 3.14 / 2;

// increments value of cosCounter by 0.00001 until it reaches 2pi
// resets value of cosCounter to 0 when 2pi is reached
function incrementCosCounters() {

  if ( xCosCounter >= 2 * PI ) xCosCounter = 0;
  else xCosCounter += 0.0001;

  if ( yCosCounter >= 2 * PI ) yCosCounter = 0;
  else yCosCounter += 0.0001;
}


// holds the coordinates of the center of a pyramid
// render draws the pyramid based on the center and the sideSize
// color is modified based on cosCounter or sliders depending on whether the animation is active or not
class Pyramid {
  constructor ( x, y ) {

    this.xCenter = x;
    this.yCenter = y; 
    this.reds = random(200);
    this.greens = random(200);
    this.blues = random(200);
  }

  render() {
    // upper-left point
    var x1 = this.xCenter - sideSize / 2;
    var y1 = this.yCenter - sideSize / 2;

    // upper-right point
    var x2 = this.xCenter + sideSize / 2;
    var y2 = this.yCenter - sideSize / 2;

    // lower-right point
    var x3 = this.xCenter + sideSize / 2;
    var y3 = this.yCenter + sideSize / 2;

    // lower-left point
    var x4 = this.xCenter - sideSize / 2;
    var y4 = this.yCenter + sideSize / 2;

    // for determining the color of each triangle
    var xDistanceFromCenter = cos(xCosCounter) * width / 2;
    var yDistanceFromCenter = cos(yCosCounter) * width / 2;

    incrementCosCounters();

    // have to transform numbers[-width/2,width/2] to [-100,100]
    xDistanceFromCenter *= 100 / ( width / 2 );

    // have to transform numbers[-height/2,height/2] to [-100,100]
    yDistanceFromCenter *= 100 / ( height / 2 );
    
    // up triangle
    fill ( this.reds + yDistanceFromCenter, this.greens +  yDistanceFromCenter, this.blues + yDistanceFromCenter );
    triangle ( x1, y1, x2, y2, this.xCenter, this.yCenter );
    
    // left triangle
    fill ( this.reds + xDistanceFromCenter, this.greens + xDistanceFromCenter, this.blues + xDistanceFromCenter );
    triangle ( x1, y1, x4, y4, this.xCenter, this.yCenter );
    
    // down triangle
    fill ( this.reds - yDistanceFromCenter, this.greens - yDistanceFromCenter, this.blues - yDistanceFromCenter );
    triangle ( x3, y3, x4, y4, this.xCenter, this.yCenter );
    
    // right triangle
    fill ( this.reds - xDistanceFromCenter, this.greens - xDistanceFromCenter, this.blues - xDistanceFromCenter);
    triangle ( x3, y3, x2, y2, this.xCenter, this.yCenter );
  }
}

function setup () {

  var animationHolder = createCanvas ( 1500, 1000 );

  // creates the pyramids which will be seen on the screen
  // puts them into an array
  for ( var i = 0; i < width; i += sideSize ) {

    for ( var j = 0; j < height; j += sideSize ) {

      pyramids.push ( new Pyramid ( i + sideSize/2, j + sideSize/2 ) );
    }
  }

}

// calls render for all pyramids 
function draw () {

  background ( 220 );

  for ( var i = 0; i < pyramids.length; ++i ) {
    pyramids[i].render();
  }

}

