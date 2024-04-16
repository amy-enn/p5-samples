
function goldMinesSketch(p) {
    let canvasWidth, canvasHeight;
    let minesData = [];
    let chkCrown, chkPrivate, chkOther, chkPoor, chkModerate, chkGood, chkHigh, chkMedium, chkLow;

    const colors = {
        // purple
        Poor: '#8A2BE2',
        // pink
        Moderate: '#FFC0CB',
        // blue
        Good: '#00BFFF'  
    };
    

    // convert latitude and longitude to canvas x and y
    function latLongToCanvas(lat, long) {
        let x = p.map(long, -66.3, -59.8, 0, canvasWidth);
        let y = p.map(lat, 43.0, 47.0, canvasHeight, 0);
        return { x, y };
    }

    p.setup = () => {
        canvasWidth = p.windowWidth * 0.75;
        canvasHeight = canvasWidth;
        let canvas = p.createCanvas(canvasWidth, canvasHeight);
        canvas.parent('canvasDivTwo');
        setupCheckboxes();

        // load data
        p.loadJSON('/goldmines.json', data => { 
            minesData = data; 
            minesData = data.filter(mine => ["Poor", "Moderate", "Good"].includes(mine.Escape_pot.trim()));
            // console.log(minesData); 
        });

    };

    function setupCheckboxes() {
        // get p5 references to checkboxes
        chkCrown = p.select('#chkCrown');
        chkPrivate = p.select('#chkPrivate');
        chkOther = p.select('#chkOther');
        chkPoor = p.select('#chkPoor');
        chkModerate = p.select('#chkModerate');
        chkGood = p.select('#chkGood');
        chkHigh = p.select('#chkHigh');
        chkMedium = p.select('#chkMedium');
        chkLow = p.select('#chkLow');
    }

    p.draw = () => {
        p.background(135, 206, 250);
        drawMines();
    };

    function drawMines() {
        const circleSize = 10;
        minesData.forEach(mine => {
            const { x, y } = latLongToCanvas(mine.lat, mine.long);
            const escapeLevel = mine.Escape_pot.trim();  // Get the escape level for color mapping
    
            if (shouldDisplayMine(mine)) {
                p.fill(colors[escapeLevel]);  // Use the predefined colors for escape levels
            } else {
                p.fill(100);  // Default grey color
            }
            p.noStroke();
            p.ellipse(x, y, circleSize, circleSize);
    
            // Draw a blurred heatmap effect
            for (let i = 0; i < 10; i++) {
                let alpha = p.map(i, 0, 10, 50, 0); // Gradually reduce alpha to create a blur effect
                p.fill(p.color(p.red(colors[escapeLevel]), p.green(colors[escapeLevel]), p.blue(colors[escapeLevel]), alpha));
                p.ellipse(x, y, 10 + i * 5, 10 + i * 5);
            }
        });
    }
    

    function shouldDisplayMine(mine) {
        // filter logic based on checkbox states
        if ((chkCrown.checked() && mine.LandOwner.trim() === "Crown") ||
            (chkPrivate.checked() && mine.LandOwner.trim() === "Private") ||
            (chkOther.checked() && mine.LandOwner.trim() !== "Crown" && mine.LandOwner.trim() !== "Private")) {
            return true;
        }
        return false;
    }

    function getColorForLandOwner(landOwner) {
        if (landOwner === "Crown") {
            // green
            return p.color(0, 255, 0);
        } else if (landOwner === "Private") {
            // red
            return p.color(255, 0, 0);
        } else {
            // orange
            return p.color(255, 165, 0);
        }
    }
}

export { goldMinesSketch };

