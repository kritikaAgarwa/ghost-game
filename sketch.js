var tower,towerImage;
var door,doorImage,doorGroup;
var climber , climberImage,climberGroup;
var ghost,ghostImage;
var gameState="play"

function preload(){
  
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(600,600);
  
  tower=createSprite(300,300)
  tower.addImage("tower",towerImage);
  tower.velocityY= 4;
  
  doorGroup=createGroup();
  climberGroup=createGroup();
  
  ghost=createSprite(150,200);
  ghost.addImage("ghost",ghostImage);
  ghost.scale=0.5;
}

function draw(){
  if(gameState=="play"){
    if (tower.y > 600){
      tower.y = 300;
    }
  
  if(keyDown("space")){
    ghost.velocityY=-3;
  }
  if(keyDown("left")){
    ghost.x = ghost.x-2;
  }
  if(keyDown("right")){
    ghost.x = ghost.x+2;
  }
  if(ghost.isTouching(climberGroup)){
    ghost.velocityY=0;
  }
  
  ghost.velocityY = ghost.velocityY + 1;

  if(ghost.y>600){
    gameState="end";
  }
  
  spawnDoors();
  drawSprites();   
  }
  else if(gameState=="end"){
    background("black")
    fill("yellow");
    textSize(50);
    text("GAME OVER",200,300);
  }
 
}

function spawnDoors(){
  if(frameCount%200===0){
     door=createSprite(250,-50)
    door.addImage("door",doorImage);
    door.x = Math.round(random(200,400));
    door.velocityY= 4;
    door.lifetime=600;
    doorGroup.add(door);
    
    climber=createSprite(250,10);
    climber.addImage("climber",climberImage);
    climber.x=door.x;
    climber.velocityY=door.velocityY;
    climber.lifetime=600;
    climberGroup.add(climber);
    climber.debug=true;
    
    climber.depth = ghost.depth;
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
  }
}
