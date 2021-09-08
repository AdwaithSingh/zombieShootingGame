var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, zombieGroup;
var edges;
var heart1, heart1Img, herat2, heart2Img, heary3, heart3Img;
var bullet = 70;
var bulletsGroup;
var gameState = "fight";
var score = 0;
var life = 3;
var loseSound, winSound, bulletSound;
var bulletImg;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")

  zombieImg = loadImage("assets/zombie.png");

  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");

  loseSound = loadSound("assets/lose.mp3");
  winSound = loadSound("assets/win.mp3");
  bulletSound = loadSound("assets/explosion.mp3");

  bulletImg = loadImage("assets/bullet1.png");

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,windowWidth,windowHeight);
bg.addImage(bgImg)
bg.scale = 1.39;
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false;
   player.setCollider("rectangle",0,0,300,500)

   edges = createEdgeSprites();
   player.bounceOff(edges);

   zombieGroup = new Group();
   bulletsGroup = new Group();

   heart1 = createSprite(displayWidth-350, 40, 20, 20);
   heart1.addImage(heart1Img);
   heart1.scale = 0.27;
   heart1.visible = false;

   heart2 = createSprite(displayWidth-265, 40, 20, 20);
   heart2.addImage(heart2Img);
   heart2.scale = 0.27;
   heart2.visible = false;

   heart3 = createSprite(displayWidth-125, 40, 20, 20);
   heart3.addImage(heart3Img);
   heart3.scale = 0.27;
   


}

function draw() {
  background(0); 



if(gameState === "fight"){

if(life === 3){
  heart3.visible = true;
  heart1.visible = false;
  heart2.visible = false;
}

if(life === 2){
  heart2.visible = true;
  heart1.visible = false;
  heart3.visible = false;
}

if(life === 1){
  heart1.visible = true;
  heart2.visible = false;
  heart3.visible = false;
}

if(life === 0){
  gameState = "lost";
  heart1.visible = false;
}

if(score === 10){
  gameState = "won";
}

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-15;
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+15;
}
if(keyDown("RIGHT_ARROW")){
  player.x = player.x+15;
}
if(keyDown("LEFT_ARROW")){
  player.x = player.x-15;
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullets = createSprite(player.x+60, player.y-28, 20, 10);
  bullets.addImage(bulletImg);
  bullets.scale = 0.18;
  player.addImage(shooter_shooting)
  bullets.velocityX = 20;
  bulletsGroup.add(bullets);
  player.depth = bullets.depth;
  player.depth = player.depth+2;
  bullet = bullet-1;
  bulletSound.play();
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(bullet === 0){
  gameState = "bullet";
}
//destroy zombie when bullet touches it
if(zombieGroup.isTouching(bulletsGroup)){
  zombieGroup.destroyEach();
  bulletsGroup.destroyEach();
  score = score+2;
}

if(zombieGroup.isTouching(player)){
  zombieGroup.destroyEach();
  life = life-1;
}



spawnZombies();
}
drawSprites();

textSize(20);
fill("white");
text("BULLETS = " + bullet, displayWidth-210, displayHeight/2-250);
text("SCORE = " + score, displayWidth-200, displayHeight/2-220);
text("LIVES = " + life, displayWidth-200, displayHeight/2-280);

if(gameState === "lost"){
  textSize(100);
  fill("red");
  text("U LOST ", 400, 400);
  zombieGroup.destroyEach();
  player.destroy();
}

else if(gameState === "won"){
  textSize(100);
  fill("yellow");
  text("U WON ", 400, 400);
  zombieGroup.destroyEach();
  player.destroy();
  winSound.play();
}

else if(gameState === "bullet"){
  textSize(100);
  fill("blue");
  text("U RAN OUT OF BULLETS ", 400, 400);
  zombieGroup.destroyEach();
  player.destroy();
  bulletsGroup.destroyEach();
  loseSound.play();
}

}

function spawnZombies(){
  if(frameCount%300===0){
    zombie = createSprite(windowWidth-50, random(100,500), 40, 40);
    zombie.addImage(zombieImg);
    zombie.scale = 0.3;
    zombie.velocityX = -3.5;
    zombieGroup.add(zombie);
    zombie.lifetime = 700;
    zombie.debug = false;
    zombie.setCollider("rectangle",0,0,400,1000)

  }
}

