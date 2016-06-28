'use strict';

//global vars

var imageNameArray = ['bag','banana','bathroom','boots','breakfast','bubblegum', 'chair','cthulhu','dogDuck','dragon','pen','petSweep','scissors','shark','sweep','tauntaun','unicorn','usb','waterCan','wineGlass'];

var imageObjectArray = [];
var clickCounter = 0;
var randNum1 = 50; // these are the previous run numbers
var randNum2 = 50;
var randNum3 = 50;
var i = 50;
var j = 50;
var k = 50;

function imageLoader(imgName,idNumber) {
  this.imgName = imgName;
  this.idNumber = idNumber;
  this.filePath = 'img/' + imgName + '.jpg';
  this.imgHTMLtag = '<img src="img/' + imgName + '.jpg">';
  this.timesClicked = 0;
  this.timesViewed = 0;
  imageObjectArray.push(this);
}

function startTheGame() {
  startButton.className = 'hidden';
  return generateNewPhotos();
}

var startButton = document.getElementById('startButton');
startButton.addEventListener('click', startTheGame);

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for(var i = 0; i < imageNameArray.length; i++) {
  var newImage = imageNameArray[i];
  newImage = new imageLoader(newImage,i);
}

function getthreerandomnumbers(){
  i = getRandomNumber(0,(imageObjectArray.length - 1));
  while (i === randNum1 || i === randNum2 || i === randNum3) {
    i = getRandomNumber(0,(imageObjectArray.length - 1));
  }
  j = getRandomNumber(0,(imageObjectArray.length - 1));
  while(i === j || j === randNum1 || j === randNum2 || j === randNum3) {
    j = getRandomNumber(0,(imageObjectArray.length - 1));
  }
  k = getRandomNumber(0,(imageObjectArray.length - 1));
  while(k === j || k === i || k === randNum1 || k === randNum2 || k === randNum3) {
    k = getRandomNumber(0,(imageObjectArray.length - 1));
  }
  randNum1 = i;
  randNum2 = j;
  randNum3 = k;
}

function generateNewPhotos() {
  getthreerandomnumbers();
  var ulEl = document.getElementById('imageSpace');
  var liEl = document.createElement('li');
  liEl.id = 'firstPhotoLi';
  var imgEl = document.createElement('img');
  imgEl.setAttribute('src', imageObjectArray[i].filePath);
  imgEl.id = 'firstPhotoImg';
  imageObjectArray[i].timesViewed++;
  liEl.appendChild(imgEl);
  ulEl.appendChild(liEl);

  var liEl = document.createElement('li');
  liEl.id = 'secondPhotoLi';
  var imgEl = document.createElement('img');
  imgEl.setAttribute('src', imageObjectArray[j].filePath);
  imgEl.id = 'secondPhotoImg';
  imageObjectArray[j].timesViewed++;
  liEl.appendChild(imgEl);
  ulEl.appendChild(liEl);

  var liEl = document.createElement('li');
  liEl.id = 'thridPhotoLi';
  var imgEl = document.createElement('img');
  imgEl.setAttribute('src', imageObjectArray[k].filePath);
  imgEl.id = 'thirdPhotoImg';
  imageObjectArray[k].timesViewed++;
  liEl.appendChild(imgEl);
  ulEl.appendChild(liEl);

  clickCounter ++;
  var clickCounterEl = document.getElementById('runningTotal');
  clickCounterEl.textContent = clickCounter;
  if(clickCounter > 24) {
    imageSpace.removeEventListener('click', showMorePhotos);

    var tbEl = document.getElementById('tableResults');
    ulEl.className = 'hidden';
    var trEl = document.createElement('tr');
    var thEl = document.createElement('th');
    thEl.textContent = 'Image Name';
    trEl.appendChild(thEl);
    var thEl = document.createElement('th');
    thEl.textContent = 'Times Viewed';
    trEl.appendChild(thEl);
    var thEl = document.createElement('th');
    thEl.textContent = 'Times Clicked';
    trEl.appendChild(thEl);
    var thEl = document.createElement('th');
    thEl.textContent = 'Click Thru Rate';
    trEl.appendChild(thEl);
    tbEl.appendChild(trEl);

    for(var p = 0; p < imageObjectArray.length; p++){
      var trEl = document.createElement('tr');
      var tdEl = document.createElement('td');
      tdEl.textContent = imageObjectArray[p].imgName;
      trEl.appendChild(tdEl);
      var tdEl = document.createElement('td');
      tdEl.textContent = imageObjectArray[p].timesViewed;
      trEl.appendChild(tdEl);
      var tdEl = document.createElement('td');
      tdEl.textContent = imageObjectArray[p].timesClicked;
      trEl.appendChild(tdEl);
      var tdEl = document.createElement('td');
      tdEl.textContent = Math.floor(((imageObjectArray[p].timesClicked / imageObjectArray[p].timesViewed) * 100)) + '%';
      trEl.appendChild(tdEl);
      tbEl.appendChild(trEl);

      // console.log(imageObjectArray[p].imgName);
      // console.log(imageObjectArray[p].timesViewed);
      // console.log(imageObjectArray[p].timesClicked);
    }
  }
}

// generateNewPhotos();
var firstPhoto = document.getElementById('firstPhotoImg');

var imageSpace = document.getElementById('imageSpace');

function showMorePhotos(event) {
  if (event.target.id === 'firstPhotoImg') {
    console.log('you clicked on the first photo');
    imageObjectArray[i].timesClicked++;
    var ulEl = document.getElementById('imageSpace');
    ulEl.innerHTML = '';
    generateNewPhotos();
  }

  if (event.target.id === 'secondPhotoImg') {
    console.log('you clicked on the second photo');
    imageObjectArray[j].timesClicked++;
    var ulEl = document.getElementById('imageSpace');
    ulEl.innerHTML = '';
    generateNewPhotos();
  }

  if (event.target.id === 'thirdPhotoImg') {
    console.log('you clicked on the third photo');
    imageObjectArray[k].timesClicked++;
    var ulEl = document.getElementById('imageSpace');
    ulEl.innerHTML = '';
    generateNewPhotos();
  }

};

imageSpace.addEventListener('click', showMorePhotos);
