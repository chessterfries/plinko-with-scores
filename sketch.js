const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var world, engine;

  var divisions = [];
var particles;
var plinkos = [];

var divisionHeight=300;
var score = 0;
var turn = 0;

var gameState = "play";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }
    
}
 


function draw() {
  background("black");
  textSize(20)
 text("Score : "+score,20,30);
  Engine.update(engine);

  if(particles!=null){
    particles.display();
    if(particles.body.position.y > 760){
      if(particles.body.position.x < 300){
        score += 500;
        particles = null;
      }
      else if(particles.body.position.x > 301 && particles.body.position.x < 600){
        score += 100;
        particles = null;
      }
      else if(particles.body.position.x > 601 && particles.body.position.x < 900){
        score += 200;
        particles = null;
      }
    }
  }

  for(var i = 15; i < 270; i += 80){
    textSize(30);
    text("500", i, 530);
  }

  for(var i = 330; i < 540; i += 80){
    textSize(30);
    text("100", i, 530);
  }

  for(var i = 575; i < 810; i += 80){
    textSize(30);
    text("200", i, 530);  
  }

  if(turn >= 5){ 
    gameState = "end";
  }
  
  if(gameState === "end"){
    textSize(80);
    text("GAME OVER",150,250);
  }
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }

   /*
   if(frameCount%60===0){
     particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
     score++;
   }
   
 
  for (var j = 0; j < particles.length; j++) {
   
     particles[j].display();
   }
   */
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }
}

function mousePressed(){
  if(gameState !== "end"){
    turn++;
    particles = new Particle(mouseX, 10,10,10);
    }
}