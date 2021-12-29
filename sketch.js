var huesoImg, perroImg, perromImg, platoImg, sueloImg;
var hueso, perro, plato, suelo;
var backgroundImg;
var sueloinvisible;
var obstaculosGroup, huesosGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY; 
var score = 0;

function preload(){
  huesoImg = loadImage("hueso.png");
  platoImg = loadImage("plato.png");
  backgroundImg = loadImage("fondo1.jpg");
  perroImg = loadAnimation("perro1.png","perro2.png","perro3.png","perro4.png");
  perromImg = loadAnimation("perro muere.png");
  sueloImg = loadImage("ground.jpg");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  suelo = createSprite(width/2, height-110, width, 2);
  suelo.addImage(sueloImg);
  suelo.x = width/2;
  suelo.scale = 4;
  suelo.velocityX = 4;


  perro = createSprite(width-150,800);
  perro.addAnimation("perro",perroImg);
  perro.addAnimation("perrom",perromImg);
  perro.velocityX = -3;

  sueloinvisible = createSprite(width/2,height-10,width,125);
 
  obstaculosGroup = new Group();
  huesosGroup = new Group();
}

function draw(){
  background(backgroundImg);

  textSize(30);
  fill("black");
  stroke("red");
  strokeWeight(10);
  text("Huesos: "+score,width-150,height-850);


  if (gameState === PLAY){

    sueloinvisible.visible = false;
    //sueloinvisible.velocityX=-3;

    if(keyDown("up")){
      perro.velocityY = -15;
    }
  
    perro.velocityY = perro.velocityY + 0.5;
    perro.collide(sueloinvisible);
  
    if(suelo.x>0){
       suelo.x = suelo.width/2;
    }

    if(huesosGroup.isTouching(perro)){
      score = score + 1;
      huesosGroup.destroyEach();
    }

    if(obstaculosGroup.isTouching(perro)){
      gameState = END;
      obstaculosGroup.setVelocityXEach(0);
    }
  }
 
  if (gameState === END){
    perro.changeAnimation("perrom",perromImg);
    sueloinvisible.velocityX=0;
    obstaculosGroup.setVelocityXEach(0);
    huesosGroup.setVelocityXEach(0)
    huesosGroup.destroyEach();
    perro.velocityX = 0;
  }
 

  

  obstaculos();
  huesosf();
  drawSprites();
}

function obstaculos(){
  if(frameCount %180 === 0){
    plato = Math.round(random(7));
    plato = createSprite(150,800);
    plato.addImage(platoImg);
    plato.velocityX = 10; 
    plato.scale = 0.1;

    obstaculosGroup.add(plato);
  }
}

function huesosf(){
  if(frameCount %60 === 0){
    hueso = createSprite(width-1800,500);
    hueso.y = Math.round(random(width-1000,500));
    hueso.addImage(huesoImg);
    hueso.scale = 0.2; 
    hueso.velocityX = 10; 

    huesosGroup.add(hueso);
  } 
}