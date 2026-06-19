let layers = [];
let waveX = 0;
let scrollRotation = 0;


function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
}

function mouseWheel(event) {
  scrollRotation += event.delta * 0.002;
}

function draw() {
  background(255, 255, 255);
  push();
  translate((width / 2) - 170, height / 2); // move to center
  rotate(scrollRotation);
  drawGear2(); // draw your gear
  pop();

}

function drawGear2() {

    let mainRadius = 150;
    let radius = mainRadius;
    let currAngle = 0;

    beginShape();
    for (let angle = 0; angle < TWO_PI; angle += 0.01) {

        // if angle is close to a spike point
        radius = mainRadius + sin(angle * 20) * 30;

        let x = cos(angle) * radius;
        let y = sin(angle) * radius;

        vertex(x, y);
        currAngle += 0.02
    }
    endShape(CLOSE);
}

function drawWavyCircle() {
  let mainRadius = 150;
  let radius;

  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += 0.01) {

    radius = mainRadius + sin(angle * 4) * 30;
    // multiply angle to get more waves

    let x = cos(angle) * radius;
    let y = sin(angle) * radius;

    vertex(x, y);
  }
  endShape(CLOSE);
}

function drawGear() {

    let mainRadius = 600;
    let newRadius = 800;
    let radius = mainRadius;
    let angleDiff = 0;
    let angleSpike = 20;


    beginShape();
    for (let angle = 0; angle < TWO_PI; angle += 0.02) {
        if (angleDiff == angleSpike) {
            if (radius == mainRadius) {
                radius = newRadius
            } else {
                radius = mainRadius
            }
        }

        x = cos(angle) * radius
        y = sin(angle) * radius

        vertex(x, y)
    }
    endShape(CLOSE);
}

function drawNeurons() {
  for (let layer of layers) {
    for (let n of layer) {
      let glow = 0;

      // If activated, glow for 30 frames
      if (n.activated) {
        glow = map(frameCount - n.activationTime, 0, 30, 255, 0);
        if (frameCount - n.activationTime > 30) {
          n.activated = false;
        }
      }

      fill(0, 200, 255, 150 + glow);
      stroke(0, 200, 255);
      strokeWeight(2);
      circle(n.x, n.y, 40);
    }
  }
}

function drawConnections() {
  stroke(0, 150, 255, 80);
  strokeWeight(2);

  for (let i = 0; i < layers.length - 1; i++) {
    for (let a of layers[i]) {
      for (let b of layers[i + 1]) {
        line(a.x, a.y, b.x, b.y);
      }
    }
  }
}

function drawWave() {
  stroke(255, 255, 255, 100);
  strokeWeight(4);
  line(waveX, 0, waveX, height);

  // Check activation
  for (let layer of layers) {
    for (let n of layer) {
      if (!n.activated && abs(waveX - n.x) < 10) {
        n.activated = true;
        n.activationTime = frameCount;
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
