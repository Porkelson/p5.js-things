var vals = [];
var size = 50;
var tabT = [];
var w;
var iter = 0;
var inc = 1;
function setup() {
  createCanvas(1100, 800);
  background(0);

  w = width / size;

  for (var i = 0; i < size; i++) {
    vals[i] = floor(random(height));
  }

  sortIt(vals);
  //  fill(255, 80);
  // for (var i = 0; i < size; i++) {
  //   fill(vals[i],0,0,230)
  //   rect(i * w, height - vals[i], w, vals[i]);
  // }

  frameRate(120);
}

function draw() {
  background(0);
  for (var j = 0; j < size; j++) {
    var R = map(tabT[iter][j], 0, height, 0, 255);
    var G = map(tabT[iter][j], 0, height, 255, 0);
    var B = 0;
    fill(R, G, B);
    rect(j * w, height - tabT[iter][j], w, tabT[iter][j]);
  }
  if (iter == tabT.length - 1) {
    shuffle(vals,true);
    tabT.length = 0;
    sortIt(vals);
    iter = 0;
  }
  iter += inc;
}
function sortIt(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[i]) {
        var temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
        var newT = [];
        for (k = 0; k < arr.length; k++) {
          newT.push(arr[k]);
        }
        tabT.push(newT);
      }
    }
  }
  // return;
}
