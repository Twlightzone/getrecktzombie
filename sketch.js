const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, bridge;
var leftWall, rightWall;
var jointPoint;
var jointLink;
var zombie;
var zombie1, zombie2, zombie3, zombie4;
var breakButton;
var backgroundImage;
var ball, ball2, ball3, ball4, ball5, ball6, ball7, ball8;
var stones = [];

function preload() {
  zombie1 = loadImage("./assets/zombie1.png");
  zombie2 = loadImage("./assets/zombie2.png");

  zombie3 = loadImage("./assets/zombie3.png");
  zombie4 = loadImage("./assets/zombie4.png");

  backgroundImage = loadImage("./assets/background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height - 10, width * 2, 20);
  leftWall = new Base(100, height - 300, 200, height / 2 + 100);
  rightWall = new Base(width - 100, height - 300, 200, height / 2 + 100);

  bridge = new Bridge(30, { x: 50, y: height / 2 - 140 });
  jointPoint = new Base(width - 250, height / 2 - 100, 40, 20);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  var ball_options = {
    restitution: 0.8,
    frictionair:0.001,
    friction:1,
  }
  
  
  ball = Bodies.circle(600,100,40,ball_options);
 
  World.add(world,ball);
  ball2 = Bodies.circle(800,100,40,ball_options);

  World.add(world,ball2);
  ball3 = Bodies.circle(900,100,40,ball_options);

  World.add(world,ball3);
  ball4 = Bodies.circle(850,100,40,ball_options);

  World.add(world,ball4);
  ball5 = Bodies.circle(750,100,40,ball_options);

  World.add(world,ball5);
  ball6 = Bodies.circle(500,100,40,ball_options);

  World.add(world,ball6);
  ball7 = Bodies.circle(700,100,40,ball_options);

  World.add(world,ball7);
  ball8 = Bodies.circle(760,100,40,ball_options);

  World.add(world,ball8);

  zombie = createSprite(width / 2, height - 110);
  zombie.addAnimation("lefttoright", zombie1, zombie2, zombie1);
  zombie.addAnimation("righttoleft", zombie3, zombie4, zombie3);
  zombie.scale = 0.1;
  zombie.velocityX = 5;

  breakButton = createButton("");
  breakButton.position(width - 200, height / 2 - 50);
  breakButton.class("breakbutton");
  breakButton.mousePressed(handleButtonPress);
}

function draw() {
  background(backgroundImage);
  Engine.update(engine);

  bridge.show();

  ellipse(ball2.position.x,ball2.position.y,80);
  ellipse(ball.position.x,ball.position.y,80);
  ellipse(ball3.position.x,ball3.position.y,80);
  ellipse(ball4.position.x,ball4.position.y,80);
  ellipse(ball5.position.x,ball5.position.y,80);
  ellipse(ball6.position.x,ball6.position.y,80);
  ellipse(ball7.position.x,ball7.position.y,80);
  ellipse(ball8.position.x,ball8.position.y,80);
    
 

  if (zombie.position.x >= width - 300) {
    zombie.velocityX = -5;
    zombie.changeAnimation("righttoleft");
  }

  if (zombie.position.x <= 300) {
    zombie.velocityX = 5;
    zombie.changeAnimation("lefttoright");
  }

  drawSprites();
}

function handleButtonPress() {
  jointLink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}
