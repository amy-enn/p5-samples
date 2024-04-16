
export default function lighthouseSketch(p) {

    let rockY, rockHeight;
    let pulseAngle = 0;

    // wave variables
    // wave heights
    let waveAmplitude1 = 7;
    let waveAmplitude2 = 5;
    let waveAmplitude3 = 5;

    // lengths of the waves
    let waveLength1 = 200;
    let waveLength2 = 220;
    let waveLength3 = 210;

    // speeds of the wave motions
    let waveSpeed1 = 0.015;
    let waveSpeed2 = -0.01;
    let waveSpeed3 = -0.01;

    // phase offsets
    let waveOffset1 = 0;
    let waveOffset2 = 4;
    let waveOffset3 = 4;

    // bobbing variables
    let bobbingSpeed1 = 0.0012;
    let bobbingSpeed2 = 0.001;
    // up/down movement, in pixels
    let bobbingAmount1 = 5;
    let bobbingAmount2 = 8;
    // vertical offset
    let bobbingOffset1 = 0;
    let bobbingOffset2 = 0;

    // ship variables
    let shipX;
    let shipSpeed = 0.06;


    // set up the canvas
    p.setup = function () {
        let canvasWidth = p.windowWidth * .75;
        let canvasHeight = p.windowWidth * .75;

        let canvas = p.createCanvas(canvasWidth, canvasHeight);
        canvas.parent('canvasDivThree');

        // start the ship offscreen
        shipX = -30;
    };

    // create the sketch pieces
    p.draw = function () {
        p.background(220);

        pulseAngle += 0.015;
        bobbingOffset1 = p.sin(p.millis() * bobbingSpeed1) * bobbingAmount1;
        bobbingOffset2 = p.sin(p.millis() * bobbingSpeed2) * bobbingAmount2;

        // sky
        p.fill(0, 25, 51);
        p.noStroke();
        p.rect(0, 0, p.width, p.height * 2 / 3);

        // moon
        p.fill(202, 202, 202);
        p.noStroke();
        p.circle(p.width * .5, p.height * 2 / 3, p.width * .95);

        // sea
        p.fill(0, 105, 148);
        p.noStroke();
        p.rect(0, p.height * 2 / 3, p.width, p.height / 3);

        // update the ship's position each draw
        shipX += shipSpeed;
        // reset the ship's position once it reaches the other side
        if (shipX > p.width) {
            shipX = -30;
        }

        // ship (moves behind the lighthouse)
        drawShip(shipX);

        // lighthouse
        drawLighthouse();

        // wave animations
        drawWaves();
    }


    // draw the ship pieces
    function drawShip(x) {
        let shipY = p.height * 2 / 3 - 10;

        // ship body - half circle
        p.fill(102, 51, 0);
        // p.rect(x, shipY, 30, 10);
        p.arc(x + 15, shipY + 4, 22, 18, 0, p.PI);

        // sails
        p.fill(255);
        p.triangle(
            x + 12, shipY + 2,
            x + 12, shipY - 19,
            x + 28, shipY + 2
        );
        p.triangle(
            x + 5, shipY,
            x + 10, shipY - 22,
            x + 15, shipY
        );
    }

    // draw the waves animations
    function drawWaves() {
        // three layers of waves
        for (let layer = 0; layer < 3; layer++) {
            p.noStroke();
            p.beginShape();
            for (let x = 0; x <= p.width; x += 10) {
                let y;
                // if first layer
                if (layer === 0) {
                    p.fill(0, 80, 140);
                    y = p.height * 2 / 3 + p.sin(waveOffset1 + (x * 2 * p.PI) / waveLength1) * waveAmplitude1 + bobbingOffset1;
                    // if second layer
                } else if (layer === 1) {
                    p.fill(0, 90, 140);
                    y = p.height * 2 / 3 + p.sin(waveOffset2 + (x * 2 * p.PI) / waveLength2) * waveAmplitude2 + bobbingOffset2;
                }
                // third layer
                else if (layer === 2) {
                    p.fill(0, 105, 148);
                    y = p.height * 2 / 3 + p.sin(waveOffset3 + (x * 2 * p.PI) / waveLength3) * waveAmplitude1 + bobbingOffset1;
                }
                p.vertex(x, y);
            }
            // close the shape
            p.vertex(p.width, p.height);
            p.vertex(0, p.height);
            p.endShape(p.CLOSE);

            if (layer === 0) {
                waveOffset1 += waveSpeed1;
            } else {
                waveOffset2 += waveSpeed2;
            }
        }
    }


    function drawLighthouse() {
        // width and position of the lighthouse tower
        let towerWidthTop = p.width * 0.1;
        // flare the base
        let towerWidthBottom = towerWidthTop * 1.3;
        let towerHeight = p.height * 0.3;
        // the rock is wider than the base of the tower
        let rockWidth = towerWidthBottom * 3;
        rockHeight = rockWidth / 3;
        // center the rock under the tower
        let rockX = (p.width * 0.33) - (rockWidth / 1.8);
        rockY = p.height * 0.7;

        // position of the lighthouse tower
        let towerX = p.width * 0.33 - towerWidthTop / 2.2;
        // place the tower on top of the rock but partway down
        let towerY = rockY - rockHeight - towerHeight + p.height * 0.05;

        // rock
        p.fill(100);
        p.arc(rockX + rockWidth / 2, rockY, rockWidth, rockHeight * 2, p.PI, 0);


        // lighthouse tower
        p.fill(255);
        p.beginShape();
        // top left
        p.vertex(towerX, towerY);
        // top right
        p.vertex(towerX + towerWidthTop, towerY);
        // bottom right
        p.vertex(towerX + towerWidthTop / 2 + towerWidthBottom / 2, towerY + towerHeight);
        // bottom left
        p.vertex(towerX + towerWidthTop / 2 - towerWidthBottom / 2, towerY + towerHeight);
        p.endShape(p.CLOSE);

        // gallery deck position - on top of the tower
        let galleryWidth = towerWidthTop * 1.2;
        let galleryHeight = towerHeight * 0.05;
        let galleryX = towerX + (towerWidthTop / 2) - (galleryWidth / 2);
        let galleryY = towerY - galleryHeight;

        // gallery deck
        p.fill(150);
        p.rect(galleryX, galleryY, galleryWidth, galleryHeight);

        // lantern room position
        let topWidth = galleryWidth * 0.6;
        let topHeight = towerHeight * 0.1;
        let topX = galleryX + (galleryWidth - topWidth) / 2;
        let topY = galleryY - topHeight;

        // lantern room
        p.fill(180);
        p.rect(topX, topY, topWidth, topHeight);

        // roof position
        let roofWidth = topWidth * 1.5;
        let roofHeight = topHeight * 1.3;
        let roofX = topX + (topWidth - roofWidth) / 2;
        let roofY = topY;

        // roof
        p.fill(100);
        p.triangle(
            roofX, roofY,
            roofX + roofWidth, roofY,
            roofX + roofWidth / 2, roofY - roofHeight
        );

        // tower stripes
        p.fill(255, 0, 0);
        let numStripes = 4;
        for (let i = 0; i < numStripes; i++) {
            let stripeYTop = towerY + (2 * i) * (towerHeight / (2 * numStripes));
            let stripeYBottom = stripeYTop + towerHeight / (2 * numStripes);

            let stripeWidthTop = p.lerp(towerWidthTop, towerWidthBottom, (i / numStripes));
            let stripeWidthBottom = p.lerp(towerWidthTop, towerWidthBottom, ((i + 1) / numStripes));

            let stripeXTop = towerX + (towerWidthTop - stripeWidthTop) / 2;
            let stripeXBottom = towerX + (towerWidthTop - stripeWidthBottom) / 2;

            // draw the stripe using a quad so the base can be flared
            p.quad(
                // top left
                stripeXTop, stripeYTop,
                // top right
                stripeXTop + stripeWidthTop, stripeYTop,
                // bottom right
                stripeXBottom + stripeWidthBottom, stripeYBottom,
                // bottom left of stripe
                stripeXBottom, stripeYBottom
            );
        }

        // lantern position
        let lightCircleRadius = topWidth * 0.25;
        let lightCircleX = topX + topWidth / 2;
        let lightCircleY = topY + topHeight / 2;

        // lantern
        p.fill(255, 255, 0);
        p.ellipse(lightCircleX, lightCircleY, lightCircleRadius, lightCircleRadius);

        // door position
        let doorWidth = towerWidthBottom * 0.2;
        let doorHeight = towerHeight * 0.15;
        let doorX = towerX + towerWidthBottom / 2 - doorWidth / 2;
        let doorY = towerY + towerHeight - doorHeight;

        // door
        p.fill(139, 69, 19);
        p.rect(doorX, doorY, doorWidth, doorHeight);

        // lantern light beam
        let lightX = topX + topWidth / 2;
        let lightY = topY + topHeight / 2;

        // pulsing size and opacity
        // size and range of the pulsing circle
        let pulseSize = p.sin(pulseAngle) * 10 + 40;
        // opacity must be between 0 and 255
        let pulseOpacity = p.sin(pulseAngle) * 128 + 90;

        // pulsing light
        p.fill(255, 255, 0, pulseOpacity);
        p.ellipse(lightX, lightY, pulseSize, pulseSize);


    }

    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth * .75, p.windowWidth * .75);
    };
}

export { lighthouseSketch };