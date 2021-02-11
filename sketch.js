// size of the side of a square
// can be changed here manually
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
// color is modified based on cosCounter
class Pyramid {
  constructor ( x, y ) {

    this.xCenter = x;
    this.yCenter = y; 

    this.reds = random(200);
    this.greens = random(200);
    this.blues = random(200);

    // upper-left point
    this.ulPt = [ x - sideSize / 2, y - sideSize / 2 ];

    // upper-right point
    this.urPt = [ x + sideSize / 2, y - sideSize / 2 ];

    // lower-right point
    this.lrPt = [ x + sideSize / 2, y + sideSize / 2 ];
  
    // lower-left point
    this.llPt = [ x - sideSize / 2, y + sideSize / 2 ];
  }

  render() {

    // for determining the color of each triangle
    var xShade = cos(xCosCounter) * 100;
    var yShade = cos(yCosCounter) * 100;

    incrementCosCounters();
    
    // up triangle
    fill ( this.reds + yShade, this.greens + yShade, this.blues + yShade );
    triangle ( this.ulPt[0], this.ulPt[1], this.urPt[0], this.urPt[1], this.xCenter, this.yCenter );
    
    // left triangle
    fill ( this.reds + xShade, this.greens + xShade, this.blues + xShade );
    triangle ( this.ulPt[0], this.ulPt[1], this.llPt[0], this.llPt[1], this.xCenter, this.yCenter );
    
    // down triangle
    fill ( this.reds - yShade, this.greens - yShade, this.blues - yShade );
    triangle ( this.lrPt[0], this.lrPt[1], this.llPt[0], this.llPt[1], this.xCenter, this.yCenter );
    
    // right triangle
    fill ( this.reds - xShade, this.greens - xShade, this.blues - xShade );
    triangle ( this.lrPt[0], this.lrPt[1], this.urPt[0], this.urPt[1], this.xCenter, this.yCenter );
  }
};

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

