//Create variables here
var dog, happyDog, database, foodS, foodStock;
var canvas;

function preload() {
  //load images here
  dogImg = loadImage('images/dogImg.png');
  happyDogImg = loadImage('images/dogImg1.png');
}

function setup() {
  canvas = createCanvas(800, 800);
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on('value', readStock);
  
}


function draw() {  
  background(46, 139, 87);
  
  //create a sprite and put the dog image in it
  dog = createSprite(400, 400);
  dog.addImage(dogImg);
  dog.scale = 0.5;

  //if the up arrow is clicked, feed the dog one milk bottle
  if(keyWentDown(UP_ARROW)){
    foodS = foodS-1;
    writeStock(foodS);
    //dog.addImage(happyDogImg);
  }

  drawSprites();
  //add styles here
  textSize(17);
  fill(255)
  text('Note: press the up arrow key to feed Drago', 237, 30)
  textSize(25);
  fill(255);
  text('Food Remaining '+foodS, 267, 200)

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x = x-1;
  }
  
  database.ref('/').update({
    Food: x
  })
}



