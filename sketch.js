//Credit to Jeff Thompson for video pixel demo, to see his code visit https://editor.p5js.org/jeffThompson/sketches/Y2xbIzxpI
//Credit to Tim Hecker, the audio is a track called 'Into The Void' from his 2019 album, Anoyo

var video;
var aud;
var amp;
var stage = 0;

function preload() {
  aud = loadSound('void.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  amp = new p5.Amplitude();
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() { 
  ampLevel = amp.getLevel()
   if (stage == 0) {
    mirror();
   }
}

function mirror() {
  //Sets bg value to react to audio
  var bgLevel;
  bgLevel = map(ampLevel*10,0,1,255,0)
  background(bgLevel);
 
  
  //Sets stroke value to react to audio
  var colorLevel;
  colorLevel = map(ampLevel*10,0,1,0,255)
 
  //keeps from crashing by playing audio outside of draw function(looped every frame)
  if(!aud.isPlaying()){aud.play();}
  aud.setVolume(0.8)
  
  //this is what will take the amplitude and give us a value that can be used as a size to assign for grid
  var pixelSize;
  pixelSize = map(ampLevel*50,0,1,3,25)
  //console.log(pixelSize);
  var gridSize = int(pixelSize);

  //gets the data from the pixels of the video capture
  video.loadPixels();
  //defines x and y as the pixels in the video (video.height and video.width), and only reads them every 'gridSize'
  for (var y=0; y<video.height; y+=gridSize) {
    for (var x=0; x<video.width; x+=gridSize) {
      
      //"secret formula," I'm not exactly sure what this is doing
      var index = (y * video.width + x) * 4;
      // r is shorthand for RED, used as an aproximation for brightness
      var r = video.pixels[index];
      var dia = map(r, 0,255, gridSize,2);
      
      fill(colorLevel);
      noStroke();
      square(x+gridSize/2,y+gridSize/2,dia);
    }
  }
  
  
}