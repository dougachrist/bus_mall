'use strict';

//global vars

var imageNameArray = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulu', 'dogDuck', 'dragon', 'pen', 'petSweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb','waterCan'];

var imageObjectArray = [];

function imageLoader(imgName,idNumber) {

  this.imgName = imgName;
  this.idNumber = idNumber;
  this.filePath = 'img/' + imgName + '.jpg';
  this.imgHTMLtag = '<img src="img/' + imgName + '.jpg">';
  this.timesClicked = 0;
  this.timesViewed = 0;
  imageObjectArray.push(this);
}

// var bag = new imageLoader(bag,1,'img/bag.jpg');
// var banana = new imageLoader(banana,2,'img/banana.jpg');
// var bathroom = new imageLoader(bathroom,3,'img/bathroom.jpg');
// var boots = new imageLoader(boots,4,'img/boots.jpg');
// var breakfast = new imageLoader(breakfast,5,'img/breakfast.jpg');
// var bubblegum = new imageLoader(bubblegum,6,'img/bubblegum.jpg');
// var chair = new imageLoader(chair,7,'img/chair.jpg');
// var cthulu = new imageLoader(cthulu,8,'img/cthulu.jpg');
// var dogDuck = new imageLoader(dogDuck,9,'img/dog-duck.jpg'); //dog-duck
// var dragon = new imageLoader(bag,10,'img/dragon.jpg');
// var pen = new imageLoader(bag,11,'img/pen.jpg');
// var petSweep = new imageLoader(petSweep,12,'img/pet-sweep.jpg');
// var scissors = new imageLoader(bag,13,'img/scissors.jpg');
// var shark = new imageLoader(bag,14,'img/shark.jpg');
// var sweep = new imageLoader(bag,15,'img/sweep.png');
// var tauntaun = new imageLoader(bag,16,'img/tauntaun.jpg');
// var unicorn = new imageLoader(bag,17,'img/unicorn.jpg');
// var usb = new imageLoader(bag,18,'img/usb.jpg');
// var waterCan = new imageLoader(bag,19,'img/waterCan.jpg');
// var wineGlass = new imageLoader(bag,20,'img/wineGlass.jpg');

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for( var i = 0; i < imageNameArray.length; i++) {
  var newImage = imageNameArray[i];
  newImage = new imageLoader(newImage,i);
}

console.log(imageObjectArray.length);

function generateNewPhoto() {
  i = getRandomNumber(0,(imageObjectArray.length - 2));
  var ulEl = document.getElementById('imageSpace');
  var liEl = document.createElement('li');
  liEl.id = 'firstPhotoLi';
  var imgEl = document.createElement('img');
  imgEl.setAttribute('src', imageObjectArray[i].filePath);
  imgEl.id = 'firstPhotoImg';
  liEl.appendChild(imgEl);
  ulEl.appendChild(liEl);
}

generateNewPhoto();
var firstPhoto = document.getElementById('firstPhotoImg');

var imageSpace = document.getElementById('imageSpace');

function repeatFunction(event) {
  if (event.target.id === 'firstPhotoImg') {
    console.log('you clicked on the photo');
    var ulEl = document.getElementById('imageSpace');
    ulEl.innerHTML = '';
    generateNewPhoto();
  }
};

imageSpace.addEventListener('click', repeatFunction);

// var liEl = document.getElementById('')

// var
//
// addEventListener('click', somefunction)
// var ulEl = document.getElementById('imageSpace');
// ulEl.innerHTML = '';
//
// i = getRandomNumber(0,imageObjectArray.length);
// var liEl = document.getElementById('fistPhoto');
// liEl.innerHTML = imageObjectArray[i].imgHTMLtag;
