//Create variables here

var dog, normalDog,happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  
  happyDog = loadImage("images/dogImg.png");

  normalDog = loadImage("images/dogImg1.png");

  foodS = 20;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock,showError);
}

function setup() {
	createCanvas(500,500);
  
  dog = createSprite(250,250,20,20);
  dog.addImage(normalDog);
  dog.scale = 0.25;


}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  //add styles here

  fill("white");
  text("Note: Press the up arrow to feed the dog milk!",130,20)
  text("Food Remaining: " + foodS,200,150);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }else{
    x = x - 1;
  }

  database.ref('/').update({
    Food: x
  })
}

function showError(){
  console.log("ERROR");
}