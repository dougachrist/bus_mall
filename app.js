'use strict';

//global vars

var imageNameArray = ['bag','banana','bathroom','boots','breakfast','bubblegum', 'chair','cthulhu','dogDuck','dragon','pen','petSweep','scissors','shark','sweep','tauntaun','unicorn','usb','waterCan','wineGlass'];

var imageObjectArray = [];
var clickCounter = -1;
var randNum1 = 50; // these place holders for previous run numbers
var randNum2 = 50;
var randNum3 = 50;
var i = 50;
var j = 50;
var k = 50;
var clicksPerProduct = [];
var viewsPerProduct = [];
var clickThruPerProduct = [];
var maxIndex = 0;

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
  var intro = document.getElementById('intro');
  intro.className = 'hidden';
  var runningCounter = document.getElementById('runningCounter');
  runningCounter.className = 'active';
  return generateNewPhotos();
}

function closeTable() {
  var tbEl = document.getElementById('tableResults');
  tbEl.innerHTML = '';
  createChart();
}

var startButton = document.getElementById('startButton');
startButton.addEventListener('click', startTheGame);

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//create the objects
for(var i = 0; i < imageNameArray.length; i++) {
  var newImage = imageNameArray[i];
  newImage = new imageLoader(newImage,i);
}

function getthreerandomnumbers() {
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

    for(var b = 0; b < imageObjectArray.length; b++ ){
      clicksPerProduct.push(imageObjectArray[b].timesClicked);
      viewsPerProduct.push(imageObjectArray[b].timesViewed);
      if(imageObjectArray[b].timesViewed !== 0) {
        var e = Math.floor(((imageObjectArray[b].timesClicked / imageObjectArray[b].timesViewed) * 100));
      } else {
        var e = 0;
      }
      clickThruPerProduct.push(e);
    }

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

    for(var p = 0; p < imageObjectArray.length; p++) {
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
      tdEl.textContent = clickThruPerProduct[p] + '%';
      trEl.appendChild(tdEl);
      tbEl.appendChild(trEl);
    }

    tbEl.addEventListener('click', closeTable);



    function indexOfMax(arr) {
      var max = arr[0];
      var maxIndex = 0;
      for (var c = 1; c < arr.length; c++) {
        if (arr[c] > max) {
          maxIndex = c;
          max = arr[c];
        }
      }
      console.log(maxIndex);
    }

    indexOfMax(clickThruPerProduct);

    // for(var d = 0; d < 5; d++) {
    //   indexOfMax(clickThruPerProduct);
    //   console.log(maxIndex);
    // }
  }
}

function checkPhoto(arrayObj) {
  arrayObj.timesClicked++;
  var ulEl = document.getElementById('imageSpace');
  ulEl.innerHTML = '';
  generateNewPhotos();
};

function showMorePhotos(event) {
  if (event.target.id === 'firstPhotoImg') {
    checkPhoto(imageObjectArray[i]);
  }
  if (event.target.id === 'secondPhotoImg') {
    checkPhoto(imageObjectArray[j]);
  }
  if (event.target.id === 'thirdPhotoImg') {
    checkPhoto(imageObjectArray[k]);
  }
};

imageSpace.addEventListener('click', showMorePhotos);

// CHART details

function createChart() {

  var mydata = {
    labels: imageNameArray,
    datasets: [
      {
        label: 'Click Per Product',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: clicksPerProduct,
      }
    ]
  };

  var canvas1 = document.getElementById('canvas1').getContext('2d');
  new Chart.Bar(canvas1, {data: mydata, options: {responsive: false}});

  var myPieChart = {
    labels: imageNameArray,
    datasets: [
      {
        data: clicksPerProduct,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',]
      }]
  };

  var canvas2 = document.getElementById('canvas2').getContext('2d');
  new Chart(canvas2, {type: 'pie', data: myPieChart, options: {responsive: false}});

  var doubleData = {
    labels: imageNameArray,
    datasets: [
      {
        label: 'Views Per Product',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: viewsPerProduct,
      },
      {
        label: 'Clicks Per Product',
        backgroundColor: 'rgba(755,49,32,0.2)',
        borderColor: 'rgba(755,49,32,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(755,49,32,0.4)',
        hoverBorderColor: 'rgba(755,49,32,1)',
        data: clicksPerProduct,
      }
    ]
  };

  var canvas3 = document.getElementById('canvas3').getContext('2d');
  new Chart.Bar(canvas3, {data: doubleData, options: {responsive: false}});

}
