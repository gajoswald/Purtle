let turtle = {}
const SQRT3 = Math.sqrt(3);
const S = 10;
const H_S = S/2;
let moveVector;

let penDown = false;
let helpText = true;
let currentCommand = resetCommand();

const movements = {
  'f': '(f)orward#distance', 
  'b': '(b)ackward#distance',
  'r': '(r)otate#degrees'
};

const commands = {
  'p': '(p)en toggle',
  'c': '(c)lear drawing canvas',
  'h': '(h)elp text toggle'
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  turtle.location = createVector(width/2, height/2);
  turtle.rotation = random(TWO_PI);
  turtle.color = 'red';
  resetTurtleCanvas();
  moveVector = createVector(5,0);
}

function draw() {
  background(255);
  image(turtle.canvas,0,0);
  if( helpText ) {
    fill('black');
    text( commandString(), 10, 10 );
  }
  drawTurtle();
}

function drawTurtle() {
  fill(turtle.color);
  push()
  translate( turtle.location.x, turtle.location.y );
  rotate(turtle.rotation);
  const X = SQRT3 * S * 0.5
  triangle( X, 0, -X, -H_S, -X, H_S);
  pop();
}

function commandString() {
  return "available commands:\n" + Object.values(movements).join("\n") + Object.values(commands).join("\n");
}

function keyPressed() {
  if( key === 'c' ) {
    resetTurtleCanvas();
  }

  if( key === 'p' ) { penDown = !penDown }

  if( key === 'h' ) { helpText =!helpText }

  if( Object.keys(movements).includes(key) ) {
    currentCommand.movement = key; 
  } 

  if( key.match(/\d/) ) {
    currentCommand.amount = int(str(currentCommand.amount) + key);
  }

  if( keyCode === RETURN ) {
    console.log( currentCommand );
    if( currentCommand.movement && currentCommand.amount > 0 ) {
      if( currentCommand.movement === 'r' ) {
        turtle.rotation += radians(currentCommand.amount);
      } else {
        const m = p5.Vector.fromAngle( 
          turtle.rotation, 
          currentCommand.movement === 'f' ? currentCommand.amount : -currentCommand.amount
        );
        if( penDown ) {
          const p1 = turtle.location;
          const p2 = p5.Vector.add(turtle.location,m);
          turtle.canvas.line(p1.x, p1.y, p2.x, p2.y);
        }
        turtle.location.add( m );        
      }
      currentCommand = resetCommand(); 
    }
  }
}

function resetCommand() {
  return {
    movement: undefined,
    amount: 0
  };  
}

function resetTurtleCanvas() {
  turtle.canvas = createGraphics(width,height);
  turtle.canvas.background(255);
}